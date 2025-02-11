document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const {value} = document.querySelector('input');
    // console.log(value);

    const header = document.querySelector('h1');
    if(value.includes('@')) {
        header.innerHTML = 'Looks good!';
    }else{
        header.innerHTML = 'Invalid email';
    }
})