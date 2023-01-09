"use strict";
const url = "https://10.114.34.56/app";

// Select existing html elements
const form = document.querySelector("form");
const button = document.querySelector("#submit");
const nameInput = document.querySelector("#name");
const passwdInput = document.querySelector("#passwd");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const locationInput = document.querySelector("#location");

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

// Add existing user data to form
const user = JSON.parse(sessionStorage.getItem("user"));
nameInput.value = user.name;
emailInput.value = user.email;
phoneInput.value = user.phone;
locationInput.value = user.location;

// Upload form data to server
async function submitForm(data) {
  const fetchOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  };
  const response = await fetch(url + "/user", fetchOptions);
  const json = await response.json();
  alert(json.message);
  updateUser();
}

// Update user data
async function updateUser() {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "content-type": "application/json",
    },
  };
  const response = await fetch(url + "/user", fetchOptions);
  const json = await response.json();
  sessionStorage.setItem("user", JSON.stringify(json));
  location.href = "profile.html";
}

// Submit form
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const data = new FormData(form);
  submitForm(data);
});
