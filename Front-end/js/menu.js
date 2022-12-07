"use strict";

const container = document.querySelector(".container");
const menuButton = document.querySelector("#navMenuButton");
const menu = document.querySelector("#navMenu");
const menuItems = document.querySelector("#navMenuItems");
const icon = document.querySelector("#navMenuIcon");
let menuHidden = true;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

menuButton.addEventListener("click", () => {
  container.classList.toggle("navMenuOpen");
  menu.classList.toggle("width-100");
  if (menuHidden) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-x");
    delay(100).then(() => menuItems.classList.toggle("hidden"));
    menuHidden = false;
  } else {
    icon.classList.remove("fa-x");
    icon.classList.add("fa-bars");
    menuItems.classList.toggle("hidden");
    menuHidden = true;
  }
});
