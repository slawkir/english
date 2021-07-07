/* eslint-disable import/extensions */
import renderCategoriesCards from "./renderCategoriesCards.js";
import renderWordCards from "./renderWordCards.js";
import { categoryCards } from "./data.js";

const checkbox = document.querySelector(".custom-control-input");
const header = document.querySelector(".header");
const menu = document.querySelector(".menu");
const label = document.querySelector(".custom-control-label");
let isGame = false;

const gameMode = () => {
  checkbox.addEventListener("click", () => {
    const menuItems = [...document.querySelectorAll("li")];
    const underlineElement = menuItems.find(
      (el) => el.style["text-decoration"] === "underline"
    ).textContent;
    if (checkbox.checked) {
      if (underlineElement === "Main Menu") {
        isGame = true;
        renderCategoriesCards(isGame);
      } else {
        isGame = true;
        renderWordCards(categoryCards.indexOf(underlineElement), isGame);
      }
      label.textContent = "Game";
      header.style = "background-color:mediumvioletred";
      menu.style = "background-color:mediumvioletred";
    } else {
      if (underlineElement === "Main Menu") {
        isGame = false;
        renderCategoriesCards(isGame);
      } else {
        isGame = false;
        renderWordCards(categoryCards.indexOf(underlineElement), isGame);
      }
      label.textContent = "Train";
      header.style = "background-color:bisque";
      menu.style = "background-color:mediumaquamarine";
    }
  });
};
export default gameMode;
