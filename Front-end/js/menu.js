"use strict";

// Select existing html elements
const body = document.querySelector("body");
const container = document.querySelector(".container");
const menuContainer = document.querySelector("#navMenuContainer");
const menuButton = document.querySelector("#navMenuButton");
const menu = document.querySelector("#navMenu");
const menuItems = document.querySelector("#navMenuItems");
const icon = document.querySelector("#navMenuIcon");

// Variables to keep track of menu state
let MenuHidden = true;
let mobile = true;

// Get current page
const htmlPath = window.location.pathname;
const htmlPage = htmlPath.substring(htmlPath.lastIndexOf("/") + 1);

// The window width where menu changes from mobile to desktop
let desctopSize = 1198;

// Chage the width depending on the current page
if (htmlPage === "front.html") {
  desctopSize = 1198;
} else if (htmlPage === "product.html") {
  desctopSize = 500;
}

// Determine if window is mobile or desktop sized
if (window.innerWidth > desctopSize) {
  mobile = false;
  MenuHidden = false;
  menuItems.classList.remove("hidden");
}

// Function to delay execution of code
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function showMenu() {
  menuContainer.classList.remove("width-0");
  menuContainer.classList.add("width-100");
  container.classList.add("MenuOpen");
  menu.classList.remove("width-0");
  menu.classList.add("width-100");
  icon.classList.remove("fa-bars");
  icon.classList.add("fa-x");
  delay(100).then(() => menuItems.classList.toggle("hidden"));

  // Categories and Filters need to be hidden only in front.html
  if (window.location.pathname === "/~lauhei/Front-end/html/front.html") {
    hideCategories();
    hideFilters();
  }
}

function hideMenu() {
  menuContainer.classList.remove("width-100");
  menuContainer.classList.add("width-0");
  container.classList.remove("MenuOpen");
  menu.classList.remove("width-100");
  menu.classList.add("width-0");
  icon.classList.remove("fa-x");
  icon.classList.add("fa-bars");
  menuItems.classList.toggle("hidden");
}

function menuDesktop() {
  menuContainer.classList.remove("width-100");
  menu.classList.remove("width-100");
  menuContainer.classList.remove("width-0");
  menu.classList.remove("width-0");
  container.classList.remove("MenuOpen");
  icon.classList.remove("fa-x");
  icon.classList.add("fa-bars");
  menuItems.classList.remove("hidden");
}

// Display desktop or mobile version of menu depending on window size
body.onresize = () => {
  if (window.innerWidth > desctopSize) {
    menuItems.classList.remove("hidden");
    if (mobile) {
      menuDesktop();
      MenuHidden = true;
      mobile = false;
    }
  } else {
    if (!mobile) {
      menuItems.classList.add("hidden");
      mobile = true;
    }
  }
};

// Toggle menu on click
menuButton.addEventListener("click", () => {
  if (MenuHidden) {
    showMenu();
    MenuHidden = false;
  } else {
    hideMenu();
    MenuHidden = true;
  }
});

// Select links whose functionality are dynamic
const profileLink = document.querySelector("#profileLink");
const addPostLink = document.querySelector("#addPostLink");
const loginLogoutLink = document.querySelector("#loginLogoutLink");

// Change links' functionality depending on if user is logged in or not
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
