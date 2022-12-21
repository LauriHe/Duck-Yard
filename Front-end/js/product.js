"use stirct";
const url = "https://10.114.34.56/app";
const post = JSON.parse(sessionStorage.getItem("post"));

function renderPost(likes, seller) {
  const imgContainer = document.querySelector(".productImgContainer");
  const mainProductInfo = document.querySelector(".mainProductInfo");
  const secondaryInfo = document.querySelector(".secondaryProductInfo");
  const additionalInfo = document.querySelector(".additionalProductInfo");

  imgContainer.innerHTML = "";
  mainProductInfo.innerHTML = "";
  secondaryInfo.innerHTML = "";
  additionalInfo.innerHTML = "";

  const img = document.createElement("div");
  img.classList.add("productImg");
  const imgUrl = url + "/" + post.image;
  img.style.cssText += `background-image:url("${imgUrl}");`;

  const heading = document.createElement("h2");
  heading.innerHTML = post.heading;
  heading.classList.add("mainText");

  const productLocation = document.createElement("h2");
  productLocation.innerHTML = `Sijainti: ${post.location}`;
  productLocation.classList.add("mainText");

  const price = document.createElement("h2");
  price.innerHTML = `${post.price}€`;
  price.classList.add("mainText");

  const sellerName = document.createElement("p");
  sellerName.innerHTML = `<i class="icon fa-solid fa-user"></i> ${seller.name}`;
  sellerName.classList.add("secondaryText");

  const sellerPhone = document.createElement("p");
  sellerPhone.innerHTML = `<i class="icon fa-solid fa-phone"></i> ${seller.phone}`;
  sellerPhone.classList.add("secondaryText");

  const likeCount = document.createElement("p");
  likeCount.innerHTML = `<i class="icon fa-solid fa-heart"></i> ${likes.numberOfLikes}`;
  likeCount.classList.add("secondaryText");

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

  secondaryInfo.appendChild(sellerName);
  secondaryInfo.appendChild(sellerPhone);
  secondaryInfo.appendChild(likeCount);

  additionalInfo.appendChild(descriptionTitle);
  additionalInfo.appendChild(description);
  additionalInfo.appendChild(expandButton);
}

const getInfo = async () => {
  try {
    const response = await fetch(url + "/post/likes/" + post.id);
    const likes = await response.json();
    const response2 = await fetch(url + "/user/" + post.profileid);
    const seller = await response2.json();
    renderPost(likes, seller);
  } catch (e) {
    console.log(e.message);
  }
};
getInfo();
