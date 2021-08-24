// POP UP

const popUp = document.querySelector("#popUp");
const show = document.querySelector("#show");
const closeButton = document.querySelector("#popUp__button-close");

const togglePopUp = () => {
  popUp.classList.toggle("popUp--hidden");
};

show.addEventListener("click", () => {
  togglePopUp();
  //   updateSizeArrContent();
});

closeButton.addEventListener("click", () => {
  togglePopUp();
});

window.addEventListener("DOMContentLoaded", (event) => {
  fetchData();
});

// FETCH JSON DATA

let multiversions;
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

// let  updateCountDisplay = () => {};
let changePriceDependingOnVariant = () => {};
function updateProductVariant(target) {
  selectedVariant = target.value;
  changePriceDependingOnVariant();
  return selectedVariant;
}

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
      const multiversionsColor = multiversions.map((el) =>
        Object.values(el.values).map((el) => el.name)
      );
      console.log(multiversionsColor);

      const products = multiversions.map((el) => {
        return Object.values(el.products);
      });
      console.log(products);
      const productUrl = products.map((el) =>
        Object.values(el).map((el) => el.url)
      );
      console.log(productUrl);

      const multiversionPriceChange = products.map((el) =>
        Object.values(el).map((el) => el.price_difference)
      );
      console.log(multiversionPriceChange);

      const sizesItems = Object.values(data.sizes.items);
      console.log(sizesItems);

      const defaultVariantDisplay = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );
      // const defaultSize = selectedSize.find

      defaultColorDisplay = multiversionsColor.find((el) => el[0]);
      console.log(defaultColorDisplay);

      defaultProduct = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );
      console.log(defaultProduct);
      console.log(productCount);

      //   updateSizeArrContent = () => {
      //     sizeArrContent = sizesItems.find(
      //       (el) => el.status === "Produkt dostępny"
      //     );
      //   };
      console.log(sizeArrContent);

      updateCountDisplay = (sizeArrContent) => {
        //   if (productCount <= size.amount) {
            console.log(sizeArrContent);

        console.log(productCount);
        // console.log(size.amount);
        document.querySelector(
          ".popUp__buttons-styleNumber"
        ).innerHTML = `<span>${productCount}</span>`;
        //   }else {
        //       alert("Niedostępna liczba produktów")
        //   }
      };
      handleProductSize = (id) => {
        const selectedSize = sizesItems.map((size, index, arr) => {
          //Display Product Count
       

          if (id) {
            if (size.name === id) {
              sizeArrContent = arr[index];
              console.log(sizeArrContent);
            
              // Display Product Price
              changePriceDependingOnVariant = () => {
                const priceDifferenceOne = parseInt(multiversionPriceChange[0], 10);
                const priceDifferenceDwo = parseInt(multiversionPriceChange[1], 10);
                const priceDifferenceThree = parseInt(multiversionPriceChange[2], 10);

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
      document.querySelector(".popUp__box-header").insertAdjacentHTML(
        "afterbegin", `<h1 class="popUp__box-name">${productName}</h1>`);

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

    })
    .catch((error) => {
      console.log(error);
    });
};

document.querySelectorAll(".popUp__box-right").forEach((size) => {
  size.addEventListener("click", (e) => {
    if (e.target.id && e.target.value === "on") {
      document.querySelector("label").classList.remove("popUp__size-checked");
      const targetId = e.target.id;
      handleProductSize(targetId);
    }
    if (e.target.id === "add") {
        console.log("dodaj frytki");
      productCount++;
      console.log(sizeArrContent);
      updateCountDisplay();

    }

    if (e.target.id === "subtract") {
      productCount--;
      updateCountDisplay();
    }
    console.log(sizeArrContent);

  });
});

