"use strict";
const url = "http://localhost:3000"; // change url when uploading to server

// select existing html elements

/*
let button1 = document.querySelector('#btn');
let button2 = document.querySelector('#btn2');
let input1 = document.querySelector('#username');
let input2 = document.querySelector('#password');
*/

let form = document.querySelector("form");
let button = document.querySelector("#submit");
/*
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
  const response = await fetch(url + '/profile/' + id);
  const cat = await response.json();
  const inputs = modForm.querySelectorAll('input');
  inputs[0].value = cat.name;
  inputs[1].value = cat.passwd;
  inputs[2].value = cat.email;
  inputs[3].value = cat.phone;
  inputs[4].value = cat.location;
};*/

// submit modify form
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);
  console.log(data);
  const fetchOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + "/user", fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = "profile.html";
});
