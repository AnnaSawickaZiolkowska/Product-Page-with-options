let product;
let sizes;
let handleProductSize;
let targetId;
let userSize;
let productCount = 1;
let sizeArrContent;
let selectedVariant;
let defaultColorDisplay;
let defaultProduct;
let productAddedToCart;
let slides;
let numberOfSlides;
let changePriceDependingOnVariant = () => {};

// POP UP

const popUp = document.querySelector("#popUp");
const cart = document.querySelector("#cart");
const show = document.querySelector("#show");
const buy = document.querySelector("#buy");

const closeButton = document.querySelector("#popUp__button-close");
const closeCartButton = document.querySelector("#cart__button-close");

const togglePopUp = () => {
  popUp.classList.toggle("popUp--hidden");
};
const toggleCartPopUp = () => {
  cart.classList.toggle("popUp--hidden");
};

show.addEventListener("click", () => {
  togglePopUp();
  sizeArrContent = defaultProduct;
  selectedVariant = defaultColorDisplay;
  document.querySelector(".slide0").classList.add("active");
  slides = document.querySelectorAll("#slide");
  numberOfSlides = slides.length;
});

buy.addEventListener("click", () => {
  toggleCartPopUp();
  getUserProduct();
  productAddedToCart = getUserProduct();
  displayCart(productAddedToCart);
});

const buttonDisabled = () => {
  sizeArrContent.amount === 0 || sizeArrContent.amount < productCount
    ? (buy.disabled = true)
    : (buy.disabled = false);
};

closeButton.addEventListener("click", () => {
  togglePopUp();
});
closeCartButton.addEventListener("click", () => {
  toggleCartPopUp();
});

window.addEventListener("DOMContentLoaded", (event) => {
  fetchData();
});

function updateProductVariant(target) {
  selectedVariant = target.value;
  changePriceDependingOnVariant(sizeArrContent);

  return selectedVariant;
}

// FETCH JSON DATA

const fetchData = () => {
  fetch("./xbox.json")
    .then((response) => response.json())
    .then((data) => {
      const productName = data.product.name;
      const multiversionsName = data.multiversions[0].name;
      const multiversions = Object.values(data.multiversions[0].items);
      const multiversionsColor = multiversions
        .map((el) => Object.values(el.values).map((el) => el.name))
        .map((el) => el.toString());

      const products = multiversions.map((el) => {
        return Object.values(el.products);
      });

      const productUrl = products
        .map((el) => Object.values(el).map((el) => el.url))
        .map((el) => el);
      const url = `${productUrl
        .map((el, index) => {
          return ` <img id="slide" class="slide${index}" src="${el}" alt="">`;
        })
        .join("")}`;
      document.querySelector("#images").innerHTML = url;

      const sizesItems = Object.values(data.sizes.items);

      // PRICE CHANGE ON COLOR
      const multiversionPriceChange = products.map((el) =>
        Object.values(el).map((el) => el.price_difference)
      );

      const priceDifferenceOne = parseInt(multiversionPriceChange[0], 10);
      const priceDifferenceDwo = parseInt(multiversionPriceChange[1], 10);
      const priceDifferenceThree = parseInt(multiversionPriceChange[2], 10);

      // Create Default Product
      defaultColorDisplay = multiversionsColor.find((el) => el === "Srebrny");

      defaultProduct = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );

      //Display and Update Product Count

      updateCountDisplay = () => {
        if (productCount <= sizeArrContent.amount) {
          document.querySelector(
            ".popUp__buttons-styleNumber"
          ).innerHTML = `<span>${productCount}</span>`;
        } else {
          alert("Niedostępna liczba produktów");
        }
        if (productCount > sizeArrContent.amount) {
          productCount = 1;
          document.querySelector(
            ".popUp__buttons-styleNumber"
          ).innerHTML = `<span>${productCount}</span>`;
        }
      };

      // Update Product Price
      changePriceDependingOnVariant = (sizeArrContent) => {
        if (selectedVariant === undefined) {
          selectedVariant = defaultColorDisplay;
          document.querySelector(
            ".popUp__box-price"
          ).innerHTML = `<span class="popUp__box-price">${
            sizeArrContent.price + priceDifferenceOne
          } zł</span>`;
        }

        if (selectedVariant === "Srebrny") {
          document.querySelector(
            ".popUp__box-price"
          ).innerHTML = `<span class="popUp__box-price">${
            sizeArrContent.price + priceDifferenceOne
          } zł</span>`;
        }
        if (selectedVariant === "Czarny") {
          document.querySelector(
            ".popUp__box-price"
          ).innerHTML = `<span class="popUp__box-price">${
            sizeArrContent.price + priceDifferenceDwo
          } zł</span>
  `;
        }
        if (selectedVariant === "Biały") {
          document.querySelector(
            ".popUp__box-price"
          ).innerHTML = `<span class="popUp__box-price">${
            sizeArrContent.price + priceDifferenceThree
          } zł</span>
  `;
        }
      };

      handleProductSize = (id) => {
        const selectedSize = sizesItems.map((size, index, arr) => {
          if (id) {
            if (size.name === id) {
              sizeArrContent = arr[index];
              changePriceDependingOnVariant(sizeArrContent);

              // Display Product Availability
              if (size.status === "Produkt dostępny") {
                document.querySelector(".popUp__availability").innerHTML = `
                <i class="fas fa-check"></i>
                <span class="popUp__availability-content">Produkt dostępny</span>`;
                document
                  .querySelector(".popUp__box-shipment")
                  .classList.remove("hidden");
              } else {
                document.querySelector(".popUp__availability").innerHTML = `
                <i class="fas fa-times" style="color: red"></i>
                <span class="popUp__availability-content">Produkt niedostępny</span> `;
                document
                  .querySelector(".popUp__box-shipment")
                  .classList.add("hidden");
              }
              return arr[index];
            }
          }
        });
        return selectedSize;
      };

      // Display Product Name
      document
        .querySelector(".popUp__box-header")
        .insertAdjacentHTML(
          "afterbegin",
          `<h1 class="popUp__box-name">${productName}</h1>`
        );

      // Set Default Price
      document.querySelector(
        ".popUp__box-price"
      ).innerHTML = `<span class="popUp__box-price">${defaultProduct.price} zł</span>`;
      document.querySelector("input[id='Ram 32 GB']");

      // Display Product Size
      const size = `${sizesItems
        .map((size, index) => {
          return ` 
          <input type="radio" id="${
            size.name
          }" name="radio-btns" defaultChecked=${index === 0}>
          <label for="${size.name}" class="popUp__size ${
            index === 0 ? "popUp__size-checked" : "inherit"
          }" >${size.name}</label>`;
        })
        .join("")}`;

      document
        .querySelector(".popUp__size-wrapper")
        .insertAdjacentHTML("afterbegin", size);

      //  Display Product Variant
      const variant = `${
        multiversionsColor &&
        multiversionsColor.map((color) => {
          return `<option value="${color}">${color}</option> `;
        })
      }`;

      document.querySelector("#variant").innerHTML = variant;

      getUserProduct = () => {
        const productAddedToCart = {
          name: productName,
          price: sizeArrContent.price,
          amount: productCount,
          sizesName: sizeArrContent.name,
          multiversionsValuesName: selectedVariant,
        };
        return productAddedToCart;
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

document.querySelectorAll("#popUpBox").forEach((size) => {
  size.addEventListener("click", (e) => {
    if (e.target.id && e.target.value === "on") {
      document.querySelector("label").classList.remove("popUp__size-checked");
      const targetId = e.target.id;
      handleProductSize(targetId);
    } else {
    }
    if (e.target.id === "add") {
      productCount++;
      updateCountDisplay();
    }
    if (e.target.id === "subtract" && productCount > 0) {
      productCount--;
      updateCountDisplay();
    }
    buttonDisabled();
  });
});

document.querySelector("#variant").addEventListener("change", (e) => {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    if (e.target.value === "Srebrny") {
      slideNumber = 0;
      slides[slideNumber].classList.add("active");
    }
    if (e.target.value === "Czarny") {
      slideNumber = 1;
      slides[slideNumber].classList.add("active");
    }
    if (e.target.value === "Biały") {
      slideNumber = 2;
      slides[slideNumber].classList.add("active");
    }
  });

// SLIDER

const slider = document.querySelector("#slider");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
let slideNumber = 0;

nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideNumber++;
  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }
  slides[slideNumber].classList.add("active");
  updateSelectedVariant(slideNumber);
});

prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideNumber--;
  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }
  slides[slideNumber].classList.add("active");
  updateSelectedVariant(slideNumber);
});

// Update Variant Color on slider change
const updateSelectedVariant = (targetValue) => {
  if (targetValue === 0) {
    selectedVariant = "Srebrny";
  }
  if (targetValue === 1) {
    selectedVariant = "Czarny";
  }
  if (targetValue === 2) {
    selectedVariant = "Biały";
  }
  document.querySelector("#variant").value = selectedVariant;

  changePriceDependingOnVariant(sizeArrContent);

  return selectedVariant;
};

// Cart Pop Up

const displayCart = (productAddedToCart) => {
  const { name, price, amount, sizesName, multiversionsValuesName } =
    productAddedToCart;
  const productsInCart = ` 
    <h4 class="cart__productName">${name}</h4>
    <h4>Ilość: ${amount} szt.</h4>
    <h4>Cena za sztukę: ${price} PLN</h4>
    <h4>Cena końcowa: ${price * amount} PLN</h4>
    <h4>Rozmiar: ${sizesName}</h4>
    <h4>Wariant: ${multiversionsValuesName}</h4>    
    `;

  document
    .querySelector("#cart__content")
    .insertAdjacentHTML("afterbegin", productsInCart);
};
