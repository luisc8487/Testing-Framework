#!/usr/bin/env node

const Runner = require('./runner');
const runner = new Runner();

const test = async () =>{
    await runner.collectFiles(process.cwd());
    console.log(runner.testFiles);
};

test();