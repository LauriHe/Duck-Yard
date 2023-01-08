"use stirct";
const url = "https://10.114.34.56/app";

// Get post data from sessionStorage
const post = JSON.parse(sessionStorage.getItem("post"));

let loggedIn = false;
if (!(sessionStorage.getItem("token") === null)) {
  loggedIn = true;
}

function renderPost(likes, seller) {
  // Select existing html elements
  const imgContainer = document.querySelector(".productImgContainer");
  const mainProductInfo = document.querySelector(".mainProductInfo");
  const secondaryInfo = document.querySelector(".secondaryProductInfo");
  const additionalInfo = document.querySelector(".additionalProductInfo");

  // Clear out placeholder data
  imgContainer.innerHTML = "";
  mainProductInfo.innerHTML = "";
  secondaryInfo.innerHTML = "";
  additionalInfo.innerHTML = "";

  // Create html elements and add data from post
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
  const sellerPhone = document.createElement("p");
  const likeCount = document.createElement("p");
  sellerName.classList.add("secondaryText");
  sellerPhone.classList.add("secondaryText");
  likeCount.classList.add("secondaryText");

  if (loggedIn) {
    sellerName.innerHTML = `<i class="icon fa-solid fa-user"></i> ${seller.name}`;
    sellerPhone.innerHTML = `<i class="icon fa-solid fa-phone"></i> ${seller.phone}`;
    likeCount.innerHTML = `<i class="icon fa-solid fa-heart"></i> ${likes.numberOfLikes}`;
  } else {
    sellerName.innerHTML =
      "Kirjaudu sisään nähdäksesi myyjän tiedot sekä tykkäykset";
  }

  const descriptionTitle = document.createElement("h2");
  descriptionTitle.innerHTML = "Lisätietoja";

  const description = document.createElement("p");
  description.innerHTML = post.description;
  description.classList.add("additionalText");

  const expandButton = document.createElement("input");
  expandButton.type = "checkbox";
  expandButton.classList.add("expandButton");

  // Add elements to page
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

// Get post info from server and render it
const getInfo = async () => {
  try {
    if (loggedIn) {
      const response = await fetch(url + "/post/likes/" + post.id);
      const likes = await response.json();

      const fetchOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "content-type": "application/json",
        },
      };
      const response2 = await fetch(
        url + "/user/" + post.profileid,
        fetchOptions
      );
      const seller = await response2.json();
      renderPost(likes, seller);
    } else {
      renderPost(null, null);
    }
  } catch (e) {
    console.log(e.message);
  }
};
getInfo();
