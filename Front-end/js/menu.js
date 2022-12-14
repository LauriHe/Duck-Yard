"use strict";

const container = document.querySelector(".container");
const menuContainer = document.querySelector("#navMenuContainer");
const menuButton = document.querySelector("#navMenuButton");
const menu = document.querySelector("#navMenu");
const menuItems = document.querySelector("#navMenuItems");
const icon = document.querySelector("#navMenuIcon");
let MenuHidden = true;
let mobile = true;

const htmlPath = window.location.pathname;
const thmlPage = htmlPath.substring(htmlPath.lastIndexOf("/") + 1);

let desctopSize = 1198;

if (thmlPage === "front.html") {
  desctopSize = 1198;
} else if (thmlPage === "product.html") {
  desctopSize = 500;
}

if (window.innerWidth > desctopSize) {
  mobile = false;
  MenuHidden = false;
  menuItems.classList.remove("hidden");
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

addEventListener("resize", () => {
  if (window.innerWidth > desctopSize) {
    menuItems.classList.remove("hidden");
    if (mobile) {
      menuContainer.classList.remove("width-100");
      menu.classList.remove("width-100");
      menuContainer.classList.remove("width-0");
      menu.classList.remove("width-0");
      container.classList.remove("MenuOpen");
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
    menuContainer.classList.remove("width-0");
    menuContainer.classList.add("width-100");
    container.classList.add("MenuOpen");
    menu.classList.remove("width-0");
    menu.classList.add("width-100");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-x");
    delay(100).then(() => menuItems.classList.toggle("hidden"));
    MenuHidden = false;
  } else {
    menuContainer.classList.remove("width-100");
    menuContainer.classList.add("width-0");
    container.classList.remove("MenuOpen");
    menu.classList.remove("width-100");
    menu.classList.add("width-0");
    icon.classList.remove("fa-x");
    icon.classList.add("fa-bars");
    menuItems.classList.toggle("hidden");
    MenuHidden = true;
  }
});

const profileLink = document.querySelector("#profileLink");
const addPostLink = document.querySelector("#addPostLink");
const loginLogoutLink = document.querySelector("#loginLogoutLink");

if (sessionStorage.getItem("token") === null) {
  loginLogoutLink.innerHTML = "Login";
} else {
  loginLogoutLink.innerHTML = "Logout";
}

profileLink.addEventListener("click", () => {
  if (sessionStorage.getItem("token") === null) {
    window.location.href = "login.html";
  } else {
    window.location.href = "profile.html";
  }
});

addPostLink.addEventListener("click", () => {
  if (sessionStorage.getItem("token") === null) {
    window.location.href = "login.html";
  } else {
    window.location.href = "post.html";
  }
});

loginLogoutLink.addEventListener("click", () => {
  if (sessionStorage.getItem("token") === null) {
    window.location.href = "login.html";
  } else {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "front.html";
  }
});
