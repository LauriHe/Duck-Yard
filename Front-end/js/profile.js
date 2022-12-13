"use strict";

const url = "http://localhost:3000";
const liveServerUrl = "http://127.0.0.1:5500";

function createUser(user) {
  console.log(user);

  // separated div
  const left = document.createElement("div");
  left.classList.add("left");

  const right = document.createElement("div");
  right.classList.add("right");

  // content
  const img = document.createElement("div");
  img.classList.add("profImg");
  const check = user.imgage;
  console.log(check);
  if (check == null) {
    console.log("Null");
    img.style.cssText += `background-image:url("../images/duck-with-knife-meme-pink-wallpaper-scaled.jpg");`;
  } else {
    console.log("notNull");
    const imgUrl = liveServerUrl + "/Back-end/uploads/" + user.image;
    img.style.cssText += `background-image:url("${imgUrl}");`;
  }

  const heading = document.createElement("h3");
  heading.innerHTML = `Omat tiedot:`;
  heading.classList.add("profHeading");

  const name = document.createElement("p");
  name.innerHTML = `Nimi: ${user.name}`;
  name.classList.add("profName");

  const puh = document.createElement("p");
  puh.innerHTML = `Puhelinnumero: ${user.phone}`;
  puh.classList.add("profPuh");

  const email = document.createElement("p");
  email.innerHTML = `Sähköposti: ${user.email}`;
  email.classList.add("profEmail");

  const area = document.createElement("p");
  area.innerHTML = `Paikkakunta: ${user.location}`;
  area.classList.add("profArea");

  left.appendChild(img);
  right.appendChild(heading);
  right.appendChild(name);
  right.appendChild(puh);
  right.appendChild(email);
  right.appendChild(area);

  document.querySelector(".profCard").appendChild(left);
  document.querySelector(".profCard").appendChild(right);
}

const getUser = async () => {
  /*
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/user/2" fetchOptions);
    const user = await response.json();
    createUser(user);
  } catch (e) {
    console.log(e.message);
  }
  */
  const user = JSON.parse(sessionStorage.getItem("user"));
  createUser(user);
};
getUser();
