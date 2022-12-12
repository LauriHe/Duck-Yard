"use stirct";

const post = JSON.parse(sessionStorage.getItem("post"));

const imgContainer = document.querySelector(".productImgContainer");
const mainProductInfo = document.querySelector(".mainProductInfo");
const additionalInfo = document.querySelector(".additionalProductInfo");

imgContainer.innerHTML = "";
mainProductInfo.innerHTML = "";
additionalInfo.innerHTML = "";

const img = document.createElement("div");
img.classList.add("productImg");

const heading = document.createElement("h2");
heading.innerHTML = post.heading;
heading.classList.add("mainText");

const productLocation = document.createElement("h2");
productLocation.innerHTML = `Sijainti: ${post.location}`;
productLocation.classList.add("mainText");

const price = document.createElement("h2");
price.innerHTML = `${post.price}€`;
price.classList.add("mainText");

const descriptionTitle = document.createElement("h2");
descriptionTitle.innerHTML = "Lisätietoja";

const description = document.createElement("p");
description.innerHTML = post.description;
description.classList.add("additionalText");

const expandButton = document.createElement("input");
expandButton.type = "checkbox";
expandButton.classList.add("expandButton");

imgContainer.appendChild(img);

mainProductInfo.appendChild(heading);
mainProductInfo.appendChild(productLocation);
mainProductInfo.appendChild(price);

additionalInfo.appendChild(descriptionTitle);
additionalInfo.appendChild(description);
additionalInfo.appendChild(expandButton);
