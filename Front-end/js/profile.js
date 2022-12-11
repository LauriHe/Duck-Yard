"use strict";

const url = "http://localhost:3000";
const liveServerUrl = "http://127.0.0.1:5500";

function createUser(user) {
  console.log(user);

 
    const card = document.createElement("div");
    card.classList.add("profCard");

    const img = document.createElement("div");
    img.classList.add("profImg");
    const imgUrl = liveServerUrl + "/Back-end/uploads/" + profile.image;
    img.style.cssText += `background-image:url("${imgUrl}");`;

    // Lisää otsikko
    const heading = document.createElement("h3");
    name.innerHTML = `Omat tiedot:`;
    name.classList.add("profHeading");

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

    card.appendChild(img);
    card.appendChild(heading)
    card.appendChild(name);
    card.appendChild(puh);
    card.appendChild(email);
    card.appendChild(area);

    document.querySelector("#profCard").appendChild(card);
};

const getUser = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/user/2" /*fetchOptions*/);
    const user = await response.json();
    createUser(user);
  } catch (e) {
    console.log(e.message);
  }
};
getUser();