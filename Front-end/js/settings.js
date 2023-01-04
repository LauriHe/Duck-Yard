"use strict";
const url = "https://10.114.34.56/app"; // change url when uploading to server

// select existing html elements

let form = document.querySelector("form");
let button = document.querySelector("#submit");

const nameInput = document.querySelector("#name");
const passwdInput = document.querySelector("#passwd");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const locationInput = document.querySelector("#location");

// select existing html elements

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

// add existing cat data to form
const user = JSON.parse(sessionStorage.getItem("user"));
nameInput.value = user.name;
emailInput.value = user.email;
phoneInput.value = user.phone;
locationInput.value = user.location;

// submit modify form
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = new FormData(form);
  const fetchOptions1 = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  };
  const response1 = await fetch(url + "/user", fetchOptions1);
  const json1 = await response1.json();
  alert(json1.message);

  const fetchOptions2 = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "content-type": "application/json",
    },
  };
  const response2 = await fetch(url + "/user", fetchOptions2);
  const json2 = await response2.json();
  sessionStorage.setItem("user", JSON.stringify(json2));

  location.href = "profile.html";
});



