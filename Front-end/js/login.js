'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements

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




// login
form1.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form1);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  console.log(data);
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = 'front.html';
  }
});

// submit register form
form2.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form2);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  alert(json.message);
});


        