"use strict";

const url = "http://localhost:3000";
const liveServerUrl = "http://127.0.0.1:5500";

function createCards(posts) {
  console.log(posts);

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("mainCard");

    const link = document.createElement("a");
    link.href = `product.html`;

    const img = document.createElement("div");
    img.classList.add("cardImage");
    const imgUrl = liveServerUrl + "/Back-end/uploads/" + post.image;
    img.style.cssText += `background-image:linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.092),
      var(--secondary-color)
    ),
    url("${imgUrl}");`;

    const heading = document.createElement("p");
    heading.innerHTML = post.heading;
    heading.classList.add("cardText");

    const location = document.createElement("p");
    location.innerHTML = `Sijainti: ${post.location}`;
    location.classList.add("cardLocation");

    const price = document.createElement("p");
    price.innerHTML = `${post.price}€`;
    price.classList.add("cardPrice");

    const like = document.createElement("i");
    like.classList.add("fa-regular");
    like.classList.add("fa-heart");

    card.appendChild(link);
    card.appendChild(img);
    card.appendChild(heading);
    card.appendChild(location);
    card.appendChild(price);
    card.appendChild(like);

    document.querySelector("#mainCards").appendChild(card);
  });
}

const getPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post/" /*fetchOptions*/);
    const posts = await response.json();
    createCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPosts();
