"use strict";

const categoryButton = document.querySelector("#categoryButton");
const categoryMenu = document.querySelector("#categoryMenu");
const categoryItem = document.querySelectorAll(".categoryItem");

const filterButton = document.querySelector("#filterButton");
const filterMenu = document.querySelector("#filterMenu");
const filterItem = document.querySelectorAll(".filterItem");

let categoryMenuHidden = true;
let filterMenuHidden = true;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

categoryButton.addEventListener("click", () => {
  container.classList.toggle("MenuOpen");
  if (categoryMenuHidden) {
    categoryMenu.style.height = "20rem";
    categoryMenu.style.padding = "2rem";
    delay(100).then(() =>
      categoryItem.forEach((element) => element.classList.toggle("hidden"))
    );
    categoryMenuHidden = false;
  } else {
    categoryMenu.style.height = "0";
    categoryMenu.style.padding = "0rem";
    delay(100).then(() =>
      categoryItem.forEach((element) => element.classList.toggle("hidden"))
    );
    categoryMenuHidden = true;
  }
});

filterButton.addEventListener("click", () => {
  container.classList.toggle("MenuOpen");
  if (filterMenuHidden) {
    filterMenu.style.height = "20rem";
    filterMenu.style.padding = "2rem";
    delay(100).then(() =>
      filterItem.forEach((element) => element.classList.toggle("hidden"))
    );
    filterMenuHidden = false;
  } else {
    filterMenu.style.height = "0";
    filterMenu.style.padding = "0rem";
    delay(100).then(() =>
      filterItem.forEach((element) => element.classList.toggle("hidden"))
    );
    filterMenuHidden = true;
  }
});
