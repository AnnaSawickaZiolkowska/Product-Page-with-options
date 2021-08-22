
// POP UP

const popUp = document.querySelector("#popUp");
const show = document.querySelector("#show");
const closeButton = document.querySelector("#popUp__button-close");

console.log(closeButton);
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
document.querySelector("#popUpBox").addEventListener('click', (e) => {
    console.log(e.target);
})


// document.querySelectorAll('.popUp__size-wrapper').forEach((size) => {
//     console.log(size);
//        size.addEventListener("click", (e) => {
//            e.preventDefault()
//            console.log(e.target);
//            console.log(e.target.value);

//     });
//      });

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


      sizesItems.map((size, index, arr) => {
        console.log(index);
        console.log(arr[index]);
        console.log(size);
      })







      console.log(data.product.icon);
      // console.log(data.product);
      // console.log(data.sizes);

const handleSize = (size) => {
    return `
<div class="popUp__box-size">Rozmiar:</div>
<div class="popUp__size-wrapper">
${sizesItems.map((size, index, arr) => {
    console.log(index);
    console.log(arr);
    console.log(size);
return ` <input type="radio" id="radio-btn-1" name="radio-btns">
         <label for="radio-btn-1" class="popUp__size">${size.name}</label>`
        }).join("")}
        </div>
    `;
} 


// document.querySelector("").innerHTML = `
// <section class="popUp__box-left">
//                 <div>lalala</div>
//             </section>
//             <section class="popUp__box-right">
//                 <div class="popUp__box-header">
//                      <h1 class="popUp__box-name">${productName}</h1>
                    
//                      <img class="popUp__button-close" id="popUp__button-close" aria-label="close popup" src="./svg/times-solid.svg" alt="close button" aria-hidden="true"/>
//                 </div>
//                 <div class="popUp__box-price">125,00 zł</div>
//                 <div class="popUp__box-size">Rozmiar:</div>
//                 <div class="popUp__size-wrapper">
//                 ${sizesItems.map((size) => {
//                     return ` <input type="radio" id="${size.name}" name="radio-btns">
//                     <label for="${size.name}" class="popUp__size">${size.name}</label>`
//                 }).join('')}
//                 </div>
//                 <label for="variant" class="popUp__box-variant">${multiversionsName}:</label>
//                 <div class="popUp__variant-wrapper">
//                     <select name="variant" id="variant">
//                         <option value="Srebrny">Srebrny</option>
//                         <option value="Czarny">Czarny</option>
//                         <option value="Biały">Biały</option>
//                     </select>
//                 </div>
//                 <div class="popUp__box-availability">
//                     <div class="popUp__availability">
//                     ${sizesItems.map((el) => {
//                         if(el.amount > 0){
// return `<i class="fas fa-check"></i>
//                         <span class="popUp__availability-content">${el.status}</span>
//                         `
//                     }
//                 }).join('')}

//                     </div>
                    
//                     <div class="popUp__box-shipment">
//                         <div class="popUp__time"><i class="fas fa-history"></i></div>
//                         <div>
                        
//                             <h5>Możemy wysłać już dzisiaj!</h5>
//                             <h5 class="popUp_shipment-cost">Sprawdź czas i koszt wysyłki</h5>
//                         </div>
//                     </div>
//                 </div>
                 
//                 <div class="popUp__box-buttons">
//                     <div class="popUp__AddSubtract">
//                         <span class="popUp__buttons-style" id="subtract">-</span>
//                         <span class="popUp__buttons-styleNumber">1</span>
//                         <span class="popUp__buttons-style" id="add">+</span>
//                     </div>
//                     <div>  <button class="button buy__button" id="buy" type="button" aria-label="buy button">
//                         Dodaj do koszyka
//                     </button></div>
//                 </div>
//             </section>
// `;

    })
    .catch((error) => {
      console.log(error);
    });
};
fetchData();



//-----------------
// Radio Button Change Size instead of css

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

document.querySelectorAll("input").forEach((size) => {
    size.addEventListener("click", (e) => {
        console.log(size);
           console.log(e.target);
           console.log(e.target.value);

    });
     });



