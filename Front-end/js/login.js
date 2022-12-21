"use strict";
const url = "https://10.114.34.56/app"; // change url when uploading to server

// select existing html elements

let form1 = document.querySelector(".signIn");
let form2 = document.querySelector(".register");
let button1 = document.querySelector("#btn");
let button2 = document.querySelector("#btn2");
let input1 = document.querySelector("#username");
let input2 = document.querySelector("#password");
let submit1 = document.querySelector("#submit1");
let submit2 = document.querySelector("#submit2");
let hide1 = document.querySelector(".hide1");
let hide2 = document.querySelector(".hide2");

function hideFunction() {
  console.log("klick");
  hide2.removeAttribute("hidden", "");
  hide1.setAttribute("hidden", "");
  submit2.removeAttribute("hidden", "");
  submit1.setAttribute("hidden", "");
  button1.setAttribute("hidden", "");
  button2.removeAttribute("hidden");
}

function hideFunction2() {
  console.log("klick2");
  submit1.removeAttribute("hidden", "");
  submit2.setAttribute("hidden", "");
  button1.removeAttribute("hidden");
  button2.setAttribute("hidden", "");
  hide2.setAttribute("hidden", "");
  hide1.removeAttribute("hidden", "");
}

// login
form1.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form1);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(data);
  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();
  console.log("login response", json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("user", JSON.stringify(json.user));
    location.href = "front.html";
  }
});

// submit register form
form2.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = new FormData(form2);
  const fetchOptions = {
    method: "POST",

    body: data,
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  alert(json.message);
});
