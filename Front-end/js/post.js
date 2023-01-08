"use strict";
const url = "https://10.114.34.56/app";

// Select form and submit button
let form = document.querySelector("#postForm");
let button = document.querySelector("#postbtn");

// Send form data to server
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = new FormData(form);
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  };
  const response = await fetch(url + "/post", fetchOptions);
  const json = await response.json();
  alert(json.message);
  window.location.href = "front.html";
});
