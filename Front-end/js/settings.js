'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements

let form = document.querySelector('.register');
let button1 = document.querySelector('#btn');
let button2 = document.querySelector('#btn2');
let input1 = document.querySelector('#username');
let input2 = document.querySelector('#password');
let submit = document.querySelector('#submit');

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// select existing html elements
const modForm = document.querySelector('#formContainer');

// add existing cat data to form
const getUser = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const cat = await response.json();
  const inputs = modForm.querySelectorAll('input');
  inputs[0].value = cat.name;
  inputs[1].value = cat.passwd;
  inputs[2].value = cat.email;
  inputs[3].value = cat.phone;
  inputs[4].value = cat.location;
};

// submit modify form
form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'profile.html';
});


