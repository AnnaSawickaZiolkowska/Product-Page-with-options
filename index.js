let multiversions;
let multiversionsColor;
let multiversionsColorAndPrice;
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
let updateSelectedVariant = () => {};

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
  updateSizeArrContent();
  selectedVariant = defaultColorDisplay;
  document.querySelector(".slide0").classList.add("active");
  slides = document.querySelectorAll("#slide")
  numberOfSlides = slides.length;
});

buy.addEventListener("click" , () => {
    toggleCartPopUp()
})

closeButton.addEventListener("click", () => {
  togglePopUp();
});
closeCartButton.addEventListener("click", () => {
    toggleCartPopUp();
});

window.addEventListener("DOMContentLoaded", (event) => {
  fetchData();
});


let changePriceDependingOnVariant = () => {};

function updateProductVariant(target) {
    console.log(target.value);
    selectedVariant = target.value;
    changePriceDependingOnVariant();
    return selectedVariant;
}
// FETCH JSON DATA

const fetchData = () => {
  fetch("./xbox.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const productName = data.product.name;
      const multiversionsName = data.multiversions[0].name;
      const multiversions = Object.values(data.multiversions[0].items);

      console.log(multiversionsName);
      console.log(multiversions);
      multiversionsColor = multiversions
        .map((el) => Object.values(el.values).map((el) => el.name))
        .map((el) => el.toString());
      console.log(multiversionsColor);

      const products = multiversions.map((el) => {
        return Object.values(el.products);
      });
      console.log(products);

      const productUrl = products
        .map((el) => Object.values(el).map((el) => el.url))
        .map((el) => el);
      console.log(productUrl);
      console.log(productUrl.map((el) => el));
      const url = `${productUrl
        .map((el, index) => {
          return ` <img id="slide" class="slide${index}" src="${el}" alt="">`;
        })
        .join("")}`;
      document.querySelector("#images").innerHTML = url;

      const multiversionPriceChange = products.map((el) =>
        Object.values(el).map((el) => el.price_difference)
      );
      console.log(multiversionPriceChange);

      const sizesItems = Object.values(data.sizes.items);
      console.log(sizesItems);

      const defaultVariantDisplay = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );
      const defaultSize = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );
      console.log(defaultSize);

      defaultColorDisplay = multiversionsColor.find((el) => el === "Srebrny");
      console.log(defaultColorDisplay);

      defaultProduct = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );
      console.log(defaultProduct);

      updateSizeArrContent = () => {
        sizeArrContent = sizesItems.find(
          (el) => el.status === "Produkt dostępny"
        );
        return sizeArrContent;
      };

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

      handleProductSize = (id) => {
        const selectedSize = sizesItems.map((size, index, arr) => {
          //Display Product Count

          if (id) {
            if (size.name === id) {
              sizeArrContent = arr[index];

              // Display Product Price
              changePriceDependingOnVariant = () => {
                const priceDifferenceOne = parseInt(
                  multiversionPriceChange[0],
                  10
                );
                const priceDifferenceDwo = parseInt(
                  multiversionPriceChange[1],
                  10
                );
                const priceDifferenceThree = parseInt(
                  multiversionPriceChange[2],
                  10
                );
                if (selectedVariant === undefined) {
                  selectedVariant = defaultColorDisplay;
                  document.querySelector(
                    ".popUp__box-price"
                  ).innerHTML = `<span class="popUp__box-price">${
                    sizeArrContent.price + priceDifferenceOne
                  } zł</span>`;
                }
                console.log(selectedVariant);
                document.querySelector(
                  ".popUp__box-price"
                ).innerHTML = `<span class="popUp__box-price">${
                  sizeArrContent.price + priceDifferenceOne
                } zł</span>`;

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
              changePriceDependingOnVariant();

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
      ).innerHTML = `<span class="popUp__box-price">${defaultVariantDisplay.price} zł</span>`;
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
        console.log(sizeArrContent);
        console.log(sizeArrContent.name);
        console.log(selectedVariant);

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

document.querySelector("#buy").addEventListener("click", (e) => {
  getUserProduct();
  productAddedToCart = getUserProduct();

  console.log(productAddedToCart);
  displayCart(productAddedToCart)
});

document.querySelectorAll(".popUp__box-right").forEach((size) => {
  size.addEventListener("click", (e) => {
    if (e.target.id && e.target.value === "on") {
      document.querySelector("label").classList.remove("popUp__size-checked");
      const targetId = e.target.id;
      handleProductSize(targetId);
    }
    if (e.target.id === "add") {
      productCount++;
      console.log(sizeArrContent);
      updateCountDisplay();
    }

    if (e.target.id === "subtract" && productCount > 0) {
      productCount--;
      updateCountDisplay();
    }
  });
});

// SLIDER

const slider = document.querySelector("#slider")
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
let slideNumber = 0;


nextBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    })

    slideNumber++;
    if (slideNumber > (numberOfSlides - 1)) {
        slideNumber = 0;
}
slides[slideNumber].classList.add("active")
console.log(slideNumber);
updateSelectedVariant(slideNumber);
})

prevBtn.addEventListener('click', () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
        
    })
    
    slideNumber--;
    if (slideNumber < 0 ) {
        slideNumber = numberOfSlides -1;
    }
    slides[slideNumber].classList.add("active")
    updateSelectedVariant(slideNumber);

    changePriceDependingOnVariant();
})
updateSelectedVariant = (targetValue) => {
    console.log(targetValue);
if (targetValue === 0) {
    selectedVariant = "Srebrny"
}
if (targetValue === 1) {
    selectedVariant = "Czarny"
}
if (targetValue === 2) {
    selectedVariant = "Biały"
}
    console.log(selectedVariant);

    document.querySelector("#variant").value = selectedVariant
    changePriceDependingOnVariant();

   return selectedVariant
}

document.querySelector("#variant").addEventListener("change", (e) => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    })
    if (e.target.value === "Srebrny") {
        slideNumber = 0;
        slides[slideNumber].classList.add("active")
    }
    if (e.target.value === "Czarny") {
        slideNumber = 1;
        slides[slideNumber].classList.add("active")
    }
    if (e.target.value === "Biały") {
        slideNumber = 2;
        slides[slideNumber].classList.add("active")
    }
})


// Cart Pop Up

const displayCart = (productAddedToCart) => {

    const { name, price, amount, sizesName, multiversionsValuesName } = productAddedToCart
    console.log(productAddedToCart);
    const productsInCart = ` 
    <h4 class="cart__productName">${name}</h4>
    <h4>Ilość: ${amount} szt.</h4>
    <h4>Cena za sztukę: ${price} PLN</h4>
    <h4>Cena końcowa: ${price * amount} PLN</h4>
    <h4>Rozmiar: ${sizesName}</h4>
    <h4>Wariant: ${multiversionsValuesName}</h4>


    
    `
    
    document.querySelector("#cart__content").insertAdjacentHTML("afterbegin", productsInCart)
}