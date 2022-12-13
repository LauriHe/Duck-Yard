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

      const link = document.createElement("div");
      link.classList.add("mainCardLink");

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

      const like = document.createElement("div");
      like.classList.add("likeButton");

      card.appendChild(link);
      card.appendChild(img);
      card.appendChild(heading);
      card.appendChild(location);
      card.appendChild(price);
      card.appendChild(like);

      document.querySelector("#mainCards").appendChild(card);

      link.addEventListener("click", () => {
        sessionStorage.setItem("post", JSON.stringify(post));
        window.location.href = "product.html";
      });

      let liked = false;

      function renderLikes() {
        if (liked) {
          like.style.backgroundPosition = "right";
        } else {
          like.style.backgroundPosition = "left";
        }
      }

      async function isLiked(postId) {
        const userId = JSON.parse(sessionStorage.getItem("user")).id;
        try {
          const response = await fetch(url + "/user/likes/" + userId);
          const likeList = await response.json();

          for (let i = 0; i < likeList.length; i++) {
            if (likeList[i].postid === postId) {
              liked = true;
            }
          }
          renderLikes();
        } catch (e) {
          console.log(e.message);
        }
      }
      isLiked(post.id);

      async function addLike(postId) {
        const userId = JSON.parse(sessionStorage.getItem("user")).id;
        try {
          const data = {
            userId: userId,
            postId: postId,
          };
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          const response = await fetch(url + "/post/like/", fetchOptions);
        } catch (e) {
          console.log(e.message);
        }
      }

      async function removeLike(postId) {
        const userId = JSON.parse(sessionStorage.getItem("user")).id;
        try {
          const data = {
            userId: userId,
            postId: postId,
          };
          const fetchOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          const response = await fetch(url + "/post/like/", fetchOptions);
        } catch (e) {
          console.log(e.message);
        }
      }

      like.addEventListener("click", () => {
        if (!liked) {
          like.style.backgroundPosition = "left";
          like.classList.add("is_animating");
          like.style.backgroundPosition = "right";
          liked = true;
          addLike(post.id);
        } else {
          like.classList.remove("is_animating");
          like.style.backgroundPosition = "left";
          liked = false;
          removeLike(post.id);
        }
      });
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
