"use strict";
const url = "https://10.114.34.56/app";

// Selected category
let currentCategory = "Kaikki ilmoitukset";

// Selected filters
let currentConditions = [];

// If like filter is selected
let checkLiked = false;

// Create cards for each post
function createCards(posts) {
  // Clear out previous cards
  document.querySelector("#mainCards").innerHTML = "";

  // Render new cards
  function renderPost(loggedIn, categories, likeList, post) {
    // Does the the post fit currently applied filters
    let hasCurrentCategory = false;
    let hasCurrentCondition = false;
    let hasLike = false;
    let hasLikeIfChecked = false;

    // If all categories are selected
    if (currentCategory === "Kaikki ilmoitukset") {
      hasCurrentCategory = true;
    }

    // If the post has the selected category
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === currentCategory) {
        hasCurrentCategory = true;
      }
    }

    // If the post has one or more of the selected conditions
    for (let i = 0; i < categories.length; i++) {
      if (currentConditions.includes(categories[i].name)) {
        hasCurrentCondition = true;
      }
    }

    // If nothing is selected
    if (currentConditions.length === 0) {
      hasCurrentCondition = true;
    }

    // If user is logged in
    if (loggedIn) {
      // If the user has liked the post
      for (let i = 0; i < likeList.length; i++) {
        if (likeList[i].postid === post.id) {
          hasLike = true;
        }
      }
    } else {
      hasLike = false;
    }

    // If posts are filtered by likes and the post has a like
    if (checkLiked === true && hasLike === true) {
      hasLikeIfChecked = true;
    }

    // If posts are not filtered by likes
    if (checkLiked === false) {
      hasLikeIfChecked = true;
    }

    // Only render post if it fits the filters
    if (hasCurrentCategory && hasCurrentCondition && hasLikeIfChecked) {
      // Create html elements and add data from post
      const card = document.createElement("div");
      card.classList.add("mainCard");

      const link = document.createElement("div");
      link.classList.add("mainCardLink");

      const img = document.createElement("div");
      img.classList.add("cardImage");

      // Get image from server
      const imgUrl = url + "/thumbnails/" + post.image;
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

      // append elements to card
      card.appendChild(link);
      card.appendChild(img);
      card.appendChild(heading);
      card.appendChild(location);
      card.appendChild(price);

      // Show like button only if user is logged in
      if (loggedIn) {
        card.appendChild(like);
      }

      // Append card to page
      document.querySelector("#mainCards").appendChild(card);

      // Go to product page when card is clicked
      link.addEventListener("click", () => {
        // Save the clicked post's info to sessionStorage
        sessionStorage.setItem("post", JSON.stringify(post));
        window.location.href = "product.html";
      });

      if (loggedIn) {
        // Change like button's background depending on if the post is liked
        function renderLikes() {
          if (liked) {
            like.style.backgroundPosition = "right";
          } else {
            like.style.backgroundPosition = "left";
          }
        }

        let liked = false;

        // Check if the post is liked
        async function isLiked(postId) {
          // Get user's id from sessionStorage
          const userId = JSON.parse(sessionStorage.getItem("user")).id;

          // Get list of the posts the user has liked
          try {
            const fetchOptions = {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "content-type": "application/json",
              },
            };
            const response = await fetch(
              url + "/user/likes/" + userId,
              fetchOptions
            );
            const likeList = await response.json();

            // If post's id is in the list
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

        // Add a like to the post
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

        // Remove a like from the post
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

        // Toggle a like when the like button is clicked
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
  }

  // For each post in reverse order
  posts
    .slice()
    .reverse()
    .forEach((post) => {
      // Get post's categories and likes and render it to the page
      const getcategoriesAndLikes = async () => {
        try {
          let loggedIn = false;
          const response = await fetch(url + "/post/categories/" + post.id);
          const categories = await response.json();

          if (!(sessionStorage.getItem("token") === null)) {
            loggedIn = true;
          }
          if (loggedIn) {
            const userId = JSON.parse(sessionStorage.getItem("user")).id;
            const fetchOptions = {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "content-type": "application/json",
              },
            };
            const response2 = await fetch(
              url + "/user/likes/" + userId,
              fetchOptions
            );
            const likeList = await response2.json();
            renderPost(loggedIn, categories, likeList, post);
          } else {
            renderPost(loggedIn, categories, null, post);
          }
        } catch (e) {
          console.log(e.message);
        }
      };
      getcategoriesAndLikes();
    });
}

// Get all posts from database
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

// Get categories from html
const categories = document.querySelectorAll(".categoryItem > input");

// Add event listeners to category buttons
categories.forEach((category) => {
  category.addEventListener("click", (e) => {
    // Update the currently selected category and rerender the posts
    currentCategory = e.target.value;
    document.querySelector("main > h2").innerHTML = currentCategory;
    getPosts();
  });
});

// Get conditions from html
const conditions = document.querySelectorAll(".filterItem > .condition");

// Add event listeners to condition buttons
conditions.forEach((condition) => {
  condition.addEventListener("click", (e) => {
    // Update the currently selected conditions and rerender the posts
    if (!condition.checked) {
      const index = currentConditions.indexOf(e.target.value);
      if (index > -1) {
        currentConditions.splice(index, 1);
      }
    } else {
      currentConditions.push(e.target.value);
    }
    getPosts();
  });
});

// Get like checkbox from html
const liked = document.querySelector("#liked");

// Add event listener to like checkbox
liked.addEventListener("click", () => {
  // Determine if the user wants to see liked posts or not and rerender the posts
  if (liked.checked) {
    checkLiked = true;
  } else {
    checkLiked = false;
  }
  getPosts();
});
