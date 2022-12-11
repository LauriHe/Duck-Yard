let form1 = document.querySelector('.signIn');
let form2 = document.querySelector('.register');
let button1 = document.querySelector('#btn')
let button2 = document.querySelector('#btn2')

function hideFunction (){
    console.log("klick");
    form1.setAttribute('hidden', '');
    form2.removeAttribute('hidden');
    button1.setAttribute('hidden', '');
    button2.removeAttribute('hidden');
};

function hideFunction2 (){
    console.log("klick2");
    form1.removeAttribute('hidden');
    form2.setAttribute('hidden', '');
    button1.removeAttribute('hidden');
    button2.setAttribute('hidden', '');
};