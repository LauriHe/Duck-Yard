"use strict";
const url = "https://10.114.34.56/app";

// Read user data from sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));

// separated div
const left = document.createElement("div");
left.classList.add("left");

const right = document.createElement("div");
right.classList.add("right");

// content
const img = document.createElement("div");
img.classList.add("profImg");

// find user image and replace it if not found
const check = user.image;
if (check != "") {
  const imgUrl = url + "/" + user.image;
  img.style.cssText += `background-image:url("${imgUrl}");`;
} else {
  img.style.cssText += `background-image:url("../images/duck-with-knife-meme-pink-wallpaper-scaled.jpg");`;
}

// Create html elements and add data from user
const heading = document.createElement("h3");
heading.innerHTML = `Omat tiedot:`;
heading.classList.add("profHeading");

const userName = document.createElement("p");
userName.innerHTML = `Nimi: ${user.name}`;
userName.classList.add("profName");

const puh = document.createElement("p");
puh.innerHTML = `Puhelinnumero: ${user.phone}`;
puh.classList.add("profPuh");

const email = document.createElement("p");
email.innerHTML = `Sähköposti: ${user.email}`;
email.classList.add("profEmail");

const area = document.createElement("p");
area.innerHTML = `Paikkakunta: ${user.location}`;
area.classList.add("profArea");

// Add elements to page
left.appendChild(img);
right.appendChild(heading);
right.appendChild(userName);
right.appendChild(puh);
right.appendChild(email);
right.appendChild(area);

document.querySelector(".profCard").appendChild(left);
document.querySelector(".profCard").appendChild(right);
