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
  if (categoryMenuHidden) {
    filterMenu.classList.remove("showMenu");
    categoryMenu.classList.add("showMenu");

    filterItem.forEach((element) => element.classList.add("hidden"));
    container.classList.add("MenuOpen");
    delay(100).then(() =>
      categoryItem.forEach((element) => element.classList.remove("hidden"))
    );

    categoryMenuHidden = false;
    filterMenuHidden = true;
  } else {
    categoryMenu.classList.remove("showMenu");

    container.classList.remove("MenuOpen");
    delay(100).then(() =>
      categoryItem.forEach((element) => element.classList.add("hidden"))
    );
    categoryMenuHidden = true;
  }
});

filterButton.addEventListener("click", () => {
  if (filterMenuHidden) {
    categoryMenu.classList.remove("showMenu");
    filterMenu.classList.add("showMenu");

    categoryItem.forEach((element) => element.classList.add("hidden"));
    container.classList.add("MenuOpen");
    delay(300).then(() =>
      filterItem.forEach((element) => element.classList.remove("hidden"))
    );

    filterMenuHidden = false;
    categoryMenuHidden = true;
  } else {
    filterMenu.classList.remove("showMenu");

    container.classList.remove("MenuOpen");
    delay(100).then(() =>
      filterItem.forEach((element) => element.classList.add("hidden"))
    );
    filterMenuHidden = true;
  }
});
