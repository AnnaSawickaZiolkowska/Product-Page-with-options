// POP UP

const popUp = document.querySelector("#popUp");
const show = document.querySelector("#show");
const closeButton = document.querySelector("#popUp__button-close");

const togglePopUp = () => {
  popUp.classList.toggle("popUp--hidden");
};

show.addEventListener("click", () => {
  togglePopUp();
});

closeButton.addEventListener("click", () => {
  togglePopUp();
});

window.addEventListener("DOMContentLoaded", (event) => {
  fetchData();
});

// FETCH JSON DATA

let multiversions;
let product;
let sizes;
let handleProductSize;
let targetId;
let userSize;

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

      // console.log(multiversions.map((el) => {
      // // Object.values(el.products).map((el) => el.url )
      // console.log(Object.values(el.products));

      //    })
      // );

      const products = multiversions.map((el) => {
        return Object.values(el.products);
      });
      console.log(products);
      const productUrl = products.map((el) =>
        Object.values(el).map((el) => el.url)
      );

      console.log(productUrl);
      const sizesItems = Object.values(data.sizes.items);
      console.log(sizesItems);

      console.log(data.product.icon);
      //   console.log(data.product);
      //   console.log(data.sizes);

      const defaultVariantDisplay = sizesItems.find(
        (el) => el.status === "Produkt dostępny"
      );
      console.log(defaultVariantDisplay);

      handleProductSize = (id) => {
        if (id) {
          const selectedSize = sizesItems.map((size, index, arr) => {
            if (size.name === id) {
              const sizeArrContent = arr[index];
              console.log(sizeArrContent);

              // Display Product Price
              document.querySelector(
                ".popUp__box-price"
              ).innerHTML = `<span class="popUp__box-price">${sizeArrContent.price} zł</span>
                  `;

              // Display Product Availability
              if (size.status === "Produkt dostępny") {
                document.querySelector(".popUp__availability").innerHTML = `
                        <i class="fas fa-check"></i>
                        <span class="popUp__availability-content">Produkt dostępny</span>`;

                        document.querySelector(".popUp__box-shipment").classList.remove("hidden");
              } else {
                document.querySelector(".popUp__availability").innerHTML = `
                <i class="fas fa-times" style="color: red"></i>
                <span class="popUp__availability-content">Produkt niedostępny</span> `;
                document.querySelector(".popUp__box-shipment").classList.add("hidden");
              }

              return arr[index];
            }
          });
          return selectedSize;
        }
      };

      // Display Product Name
      document.querySelector(".popUp__box-header").insertAdjacentHTML(
        "afterbegin",
        `
        <h1 class="popUp__box-name">${productName}</h1>`
      );

      // Set Default Variant
      document.querySelector(
        ".popUp__box-price"
      ).innerHTML = `<span class="popUp__box-price">${defaultVariantDisplay.price} zł</span>`;
      document.querySelector("input[id='Ram 32 GB']");
      console.log(document.querySelector("input[name='radio-btns']"));

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

      // Display Product Variant
      const variant = `${multiversionsColor.map((color) => {
        return `
    <option value="${color}">${color}</option>
    `;
      })}`;
      document
        .querySelector("#variant")
        .insertAdjacentHTML("afterbegin", variant);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Radio Button Change Size

// document.querySelectorAll("input").forEach((size) => {
//   size.addEventListener("change", (e) => {
//     e.preventDefault();

//     document.querySelectorAll("label").forEach((el) => {
//       el.classList.remove("popUp__size-checked");
//     });

//     if (e.target.id === size.id) {
//       let label = e.target.nextElementSibling;
//       label.classList.add("popUp__size-checked");
//     } else {
//       label.classList.remove("popUp__size-checked");
//     }
//   });
// });

document.querySelectorAll(".popUp__box-right").forEach((size) => {
  size.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.id) {
      document.querySelector("label").classList.remove("popUp__size-checked");
      const targetId = e.target.id;
      handleProductSize(targetId);
    }

    if (e.target.value) {
      console.log(e.target.value);
    }
  });
});
