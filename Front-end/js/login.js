"use strict";
const url = "https://10.114.34.56/app";

// select existing html elements
const form1 = document.querySelector(".signIn");
const form2 = document.querySelector(".register");
const button1 = document.querySelector("#btn");
const button2 = document.querySelector("#btn2");
const input1 = document.querySelector("#username");
const input2 = document.querySelector("#password");
const submit1 = document.querySelector("#submit1");
const submit2 = document.querySelector("#submit2");
const hide1 = document.querySelector(".hide1");
const hide2 = document.querySelector(".hide2");
const nameInput = document.querySelector("#name");
const passwdInput = document.querySelector("#passwd");

// Show register form
function hideFunction() {
  hide2.removeAttribute("hidden", "");
  hide1.setAttribute("hidden", "");
  submit2.removeAttribute("hidden", "");
  submit1.setAttribute("hidden", "");
  button1.setAttribute("hidden", "");
  button2.removeAttribute("hidden");
}

// Show login form
function hideFunction2() {
  submit1.removeAttribute("hidden", "");
  submit2.setAttribute("hidden", "");
  button1.removeAttribute("hidden");
  button2.setAttribute("hidden", "");
  hide2.setAttribute("hidden", "");
  hide1.removeAttribute("hidden", "");
}

// Check input validity before submitting
nameInput.addEventListener("invalid", (event) => {
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity(
      "Nimen täytyy olla vähintään 3 merkkiä pitkä."
    );
  }
  if (event.target.validity.tooShort) {
    event.target.setCustomValidity(
      "Nimen täytyy olla vähintään 3 merkkiä pitkä."
    );
  }
});
nameInput.addEventListener("change", function (event) {
  event.target.setCustomValidity("");
});

passwdInput.addEventListener("invalid", (event) => {
  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      "Salasanan täytyy olla vähintään 8 merkkiä pitkä ja sisältää vähintään yksi iso kirjain."
    );
  }
});
passwdInput.addEventListener("change", function (event) {
  event.target.setCustomValidity("");
});

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
  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();
  if (!json.user) {
    alert(json.message);
  } else {
    // save token to session storage
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
  window.location.href = "login.html";
});
