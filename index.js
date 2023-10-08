"use strict";

const myForm = document.querySelector(".filter-form");
const submitButton = document.querySelector(".submit");
const container = document.querySelector(".ad");
let filters = "page=1";

// Event listener for the filter results button
submitButton.addEventListener("click", () => {
  // To prevent ads from accumulating everytime the filters button is clicked
  container.innerHTML = "";
  // Reading filter values from the for
  const pageNumber = document.querySelector("#page").value || "";
  const name = document.querySelector("#name").value || "";
  const price = document.querySelector("#price").value || "";
  const tags = document.querySelector("#tags").value || "";
  const priceRange = document.querySelector(
    'input[name="price-condition"]:checked'
  );
  const adType = document.querySelector('input[name="ad-type"]:checked');

  // Basic data validation
  const selectedRange = priceRange ? priceRange.value : "";
  const for_sale = adType ? (adType.value === "for-sale" ? "1" : "0") : "";
  const page = pageNumber > 0 ? pageNumber : 1;

  const filter = {
    page,
    name,
    price,
    tags,
    for_sale,
  };

  // Creating the filters object
  let filters = "";
  for (let key in filter) {
    if ((key === "price") & (filter[key] != "")) {
      filters = filters + `price[${selectedRange}]=${price}&`;
      continue;
    } else {
      if (filter[key] != "") {
        filters = filters + `${key}=${filter[key]}&`;
      }
    }
  }

  // Get ads with filters applied
  fetchData(filters)
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        container.insertAdjacentHTML(
          "beforeend",
          `<div class=card>
            <h4>${element.name.toUpperCase()}</h4>
            <img src="../images/${element.photo.toLowerCase()}.jpeg" width="220", height="220" class="card-image">
            <p>${element.for_sale == "1" ? "For Sale" : "Looking to buy"}</p>
            <p>${element.for_sale == "1" ? "Price:" : "Offering:"} $${
            element.price
          }</p>
            <p>Tags: ${element.tags}</p>`
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Gets all filtered ads data from the nodepop API
const fetchData = async function (filters) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/anuncios?${filters}`
    );
    const res = await response.json();
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Default without filters specified
fetchData(filters)
  .then((data) => {
    data.forEach((element) => {
      console.log(element);
      container.insertAdjacentHTML(
        "beforeend",
        `<div class=card>
            <h4>${element.name.toUpperCase()}</h4>
            <img src="../images/${element.photo.toLowerCase()}.jpeg"  class="card-image">
            <p>${element.for_sale == "1" ? "For Sale" : "Looking to buy"}</p>
            <p>${element.for_sale == "1" ? "Price:" : "Offering:"} $${
          element.price
        }</p>
            <p>Tags: ${element.tags}</p>`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
