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
    filterMenu.style.height = "0rem";
    filterMenu.style.padding = "0rem";

    categoryMenu.style.height = "20rem";
    categoryMenu.style.padding = "2rem";

    filterItem.forEach((element) => element.classList.add("hidden"));
    container.classList.add("MenuOpen");
    delay(100).then(() =>
      categoryItem.forEach((element) => element.classList.remove("hidden"))
    );

    categoryMenuHidden = false;
    filterMenuHidden = true;
  } else {
    categoryMenu.style.height = "0";
    categoryMenu.style.padding = "0rem";

    container.classList.remove("MenuOpen");
    delay(100).then(() =>
      categoryItem.forEach((element) => element.classList.add("hidden"))
    );
    categoryMenuHidden = true;
  }
});

filterButton.addEventListener("click", () => {
  if (filterMenuHidden) {
    categoryMenu.style.height = "0rem";
    categoryMenu.style.padding = "0rem";

    filterMenu.style.height = "20rem";
    filterMenu.style.padding = "2rem";

    categoryItem.forEach((element) => element.classList.add("hidden"));
    container.classList.add("MenuOpen");
    delay(100).then(() =>
      filterItem.forEach((element) => element.classList.remove("hidden"))
    );

    filterMenuHidden = false;
    categoryMenuHidden = true;
  } else {
    filterMenu.style.height = "0";
    filterMenu.style.padding = "0rem";

    container.classList.remove("MenuOpen");
    delay(100).then(() =>
      filterItem.forEach((element) => element.classList.add("hidden"))
    );
    filterMenuHidden = true;
  }
});
