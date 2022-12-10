"use strict";

const container = document.querySelector(".container");
const menuButton = document.querySelector("#navMenuButton");
const menu = document.querySelector("#navMenu");
const menuItems = document.querySelector("#navMenuItems");
const icon = document.querySelector("#navMenuIcon");
let MenuHidden = true;
let mobile = true;

if (window.innerWidth > 1198) {
  mobile = false;
  MenuHidden = false;
  menuItems.classList.remove("hidden");
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

addEventListener("resize", () => {
  if (window.innerWidth > 1198) {
    menuItems.classList.remove("hidden");
    if (mobile) {
      container.classList.remove("MenuOpen");
      menu.classList.remove("width-100");
      icon.classList.remove("fa-x");
      icon.classList.add("fa-bars");
      menuItems.classList.toggle("hidden");
      MenuHidden = true;
      mobile = false;
    }
  } else {
    if (!mobile) {
      menuItems.classList.add("hidden");
      mobile = true;
    }
  }
});

menuButton.addEventListener("click", () => {
  if (MenuHidden) {
    container.classList.add("MenuOpen");
    menu.classList.add("width-100");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-x");
    delay(100).then(() => menuItems.classList.toggle("hidden"));
    MenuHidden = false;
  } else {
    container.classList.remove("MenuOpen");
    menu.classList.remove("width-100");
    icon.classList.remove("fa-x");
    icon.classList.add("fa-bars");
    menuItems.classList.toggle("hidden");
    MenuHidden = true;
  }
});
