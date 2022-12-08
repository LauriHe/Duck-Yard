"use strict";

const url = "http://localhost:3000";

function createCards(posts) {
  console.log(posts);

  posts.forEach((post) => {
    const card = document.createElement("div");
    const img = document.createElement("div");
    const heading = document.createElement("p");
    location.innerHTML = post.location;
    const location = document.createElement("p");
    location.innerHTML = `Sijainti: ${post.location}`;
    const price = document.createElement("p");
    const like = document.createElement("i");
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
