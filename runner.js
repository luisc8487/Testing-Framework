const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`------- ${file.shortName}`));
      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = (desc, fn) => {
        beforeEaches.forEach((fn) => fn());
        try {
          fn();
          console.log(chalk.green(`OK -  ${desc}`));
        } catch (e) {
          console.log(chalk.red(`X - ${desc}`));
          console.log(chalk.red("\t", e.mesage));
        }
      };
      try {
        require(file.name);
      } catch (e) {
        console.log(chalk.green(e));
      }
    }
  }

  async collectFiles(targetPath) {
    const files = fs.readdirSync(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({name: filePath, shortName: file});
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filePath);

        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
