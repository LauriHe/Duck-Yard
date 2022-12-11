"use strict";

const url = "http://localhost:3000";
const liveServerUrl = "http://127.0.0.1:5500";
let currentCategory = "Tietokoneet";

function createCards(posts) {
  console.log(posts);

  document.querySelector("#mainCards").innerHTML = "";

  function renderPost(categories, post) {
    let hasCurrentCategory = false;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === currentCategory) {
        hasCurrentCategory = true;
      }
    }

    if (hasCurrentCategory) {
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
    }
  }

  posts.forEach((post) => {
    const getcategories = async () => {
      try {
        const response = await fetch(url + "/post/categories/" + post.id);
        const categories = await response.json();
        renderPost(categories, post);
      } catch (e) {
        console.log(e.message);
      }
    };
    getcategories();
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

const categories = document.querySelectorAll(".categoryItem > input");

categories.forEach((category) => {
  category.addEventListener("click", (e) => {
    currentCategory = e.target.value;
    document.querySelector("main > h2").innerHTML = currentCategory;
    console.log("Current category:", currentCategory);
    getPosts();
  });
});
