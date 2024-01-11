"use strict";

import i18next from "https://deno.land/x/i18next/index.js";

const lngs = {
  en: { nativeName: "English" },
  es: { nativeName: "Spanish" },
};

let lang = "";

const myForm = document.querySelector(".filter-form");
const submitButton = document.querySelector(".submit");
const container = document.querySelector(".ad");
const langSelector = document.querySelector(".lang_selector");

let filters = "page=1";

Object.keys(lngs).map((lng) => {
  const langButton = document.createElement("button");
  if (lng === "en") {
    langButton.className = `${lng} language active-lang`;
  } else {
    langButton.className = `${lng} language`;
  }
  langButton.innerHTML = `${lng}`;
  langSelector.appendChild(langButton);
});

const langBtn = document.querySelectorAll(".language");
console.log(langBtn);

langBtn.forEach((el) => {
  el.addEventListener("click", () => {
    langSelector.querySelector(".active-lang").classList.remove("active-lang");
    el.classList.add("active-lang");
    lang = el.textContent;
    changeLanguage(lang);
  });
});

// Translations
console.log(lang);

function changeLanguage(lang) {
  i18next.init({
    lng: `${lang}`,
    // debug: true,
    resources: {
      en: {
        translation: {
          page_number: "Page number",
          price: "Price",
          name: "Name",
          tags: "Tags",
          ad_type: "Ad Type:",
          for_sale: "For sale",
          looking_to_buy: "Looking to buy",
        },
      },
      es: {
        translation: {
          page_number: "Número de página",
          price: "Precio",
          name: "Nombre",
          tags: "Etiquetas",
          ad_type: "Tipo de anuncio:",
          for_sale: "Se vende",
          looking_to_buy: "Se compra",
        },
      },
    },
  });

  const pageNumber = document.querySelector("#page-number");
  const price = document.querySelector("#price-label");
  const name = document.querySelector("#name-label");
  const tags = document.querySelector("#tags-label");
  const adType = document.querySelector("#ad-type");
  const forSale = document.querySelector("#for-sale-label");
  const lookingToBuy = document.querySelector("#looking-to-buy-label");

  pageNumber.textContent = i18next.t("page_number");
  price.textContent = i18next.t("price");
  name.textContent = i18next.t("name");
  tags.textContent = i18next.t("tags");
  adType.textContent = i18next.t("ad_type");
  forSale.textContent = i18next.t("for_sale");
  lookingToBuy.textContent = i18next.t("looking_to_buy");
}

//console.log(i18next.t("pagenumber"));

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
    console.log(response);
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
