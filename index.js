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

// FETCH JSON DATA

let multiversions;
let product;
let sizes;

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
      document.querySelector("#popUpBox").insertAdjacentHTML(
        "afterbegin",
        `

`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
fetchData();

// Radio Button Change Size

document.querySelectorAll("input").forEach((size) => {
  size.addEventListener("change", (e) => {
    e.preventDefault();

    document.querySelectorAll("label").forEach((el) => {
      el.classList.remove("popUp__size-checked");
    });

    if (e.target.id === size.id) {
      let label = e.target.nextElementSibling;
      label.classList.add("popUp__size-checked");
    } else {
      label.classList.remove("popUp__size-checked");
    }
  });
});

