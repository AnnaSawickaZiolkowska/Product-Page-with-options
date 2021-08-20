const popUp = document.querySelector("#popUp");
const show = document.querySelector('#show');
const closeButton = document.querySelector("#popUp__button-close");

const togglePopUp = () => {
    popUp.classList.toggle("popUp--hidden")
}

show.addEventListener("click" , () => {
togglePopUp();
})

closeButton.addEventListener("click", () => {
    togglePopUp();

})