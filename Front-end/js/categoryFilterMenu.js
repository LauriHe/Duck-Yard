"use strict";

// Select existing html elements
const categoryButton = document.querySelector("#categoryButton");
const categoryMenu = document.querySelector("#categoryMenu");
const categoryItem = document.querySelectorAll(".categoryItem");

const filterButton = document.querySelector("#filterButton");
const filterMenu = document.querySelector("#filterMenu");
const filterItem = document.querySelectorAll(".filterItem");

// Variables to keep track of menu state
let categoryMenuHidden = true;
let filterMenuHidden = true;

// Function to delay execution of code
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function showCategories() {
  filterMenu.classList.remove("showMenu");
  categoryMenu.classList.add("showMenu");

  filterItem.forEach((element) => element.classList.add("hidden"));
  delay(100).then(() =>
    categoryItem.forEach((element) => element.classList.remove("hidden"))
  );
}

function hideCategories() {
  categoryMenu.classList.remove("showMenu");

  delay(100).then(() =>
    categoryItem.forEach((element) => element.classList.add("hidden"))
  );
}

function showFilters() {
  categoryMenu.classList.remove("showMenu");
  filterMenu.classList.add("showMenu");

  categoryItem.forEach((element) => element.classList.add("hidden"));
  delay(300).then(() =>
    filterItem.forEach((element) => element.classList.remove("hidden"))
  );
}

function hideFilters() {
  filterMenu.classList.remove("showMenu");

  delay(100).then(() =>
    filterItem.forEach((element) => element.classList.add("hidden"))
  );
}

// Toggle category menu on click
categoryButton.addEventListener("click", () => {
  if (categoryMenuHidden) {
    showCategories();
    categoryMenuHidden = false;
    filterMenuHidden = true;
  } else {
    hideCategories();
    categoryMenuHidden = true;
  }
});

// Toggle filter menu on click
filterButton.addEventListener("click", () => {
  if (filterMenuHidden) {
    showFilters();
    filterMenuHidden = false;
    categoryMenuHidden = true;
  } else {
    hideFilters();
    filterMenuHidden = true;
  }
});
