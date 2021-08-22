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
      // console.log(data.product);
      // console.log(data.sizes);
      let sizeArr;
      handleProductSize = (id) => {
        if (id) {
          sizeArr = [];
          console.log(id);
          const selectedSize = sizesItems.map((size, index, arr) => {
            // console.log(index);
            // console.log(arr[index]);
            // console.log(size);
            if (size.name === id) {
              console.log(size);
              const sizeArrContent = arr[index];
              console.log(sizeArrContent);
              console.log(sizeArrContent.price);
           
                document.querySelector(".popUp__box-price").innerHTML = `                <span class="popUp__box-price">${sizeArrContent.price} zł</span>
                `

              sizeArr.push(sizeArrContent);
              console.log(arr[index]);
              //   return sizeArr;
              return arr[index];
            }
          });
          console.log(sizeArr);
          return sizeArr;
        }
        return sizeArr;
      };
      console.log(handleProductSize());

      //       const userSize = handleProductSize(targetId);
      //       console.log(userSize);
      // console.log(test5);
    

      console.log(userSize);
      
      // Display Product Name
      document.querySelector(".popUp__box-header").insertAdjacentHTML(
        "afterbegin",
        `
        <h1 class="popUp__box-name">${productName}</h1>`
      );

      // Display Product Size
      const size = `${sizesItems
        .map((size) => {
          return ` <input type="radio" id="${size.name}" name="radio-btns">
                         <label for="${size.name}" class="popUp__size">${size.name}</label>`;
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

      // Display Product Availability
      const availability = `

`;
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
document.querySelectorAll(".popUp__size-wrapper").forEach((size) => {
  size.addEventListener("click", (e) => {
    // console.log(size);
    console.log(e.target);
    console.log(e.target.id);
    if (e.target.id) {
      const targetId = e.target.id;
      handleProductSize(targetId);
    }
    userSize = handleProductSize(targetId);
    console.log(userSize);
  });
});
