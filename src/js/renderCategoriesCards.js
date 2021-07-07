/* eslint-disable import/extensions */

import { categoryCards, wordsCards } from "./data.js";
import createCategoryCard from "./createCategoryCard.js";
import renderWordCards from "./renderWordCards.js";

const cardsContainer = document.querySelector(".cards-container");
const menuLinks = document.querySelectorAll("li");

const renderCategoriesCards = (isGame) => {
  menuLinks.forEach((link) => {
    link.style.textDecoration = "none";
  });
  menuLinks[0].style.textDecoration = "underline";
  const categoriesContainerHTML = document.createElement("div");
  cardsContainer.innerHTML = " ";
  categoryCards.forEach((card, i) => {
    createCategoryCard(
      categoriesContainerHTML,
      categoryCards[i],
      wordsCards[i][2].image,
      isGame,
      i
    );
  });
  categoriesContainerHTML.classList.add("categories");
  cardsContainer.append(categoriesContainerHTML);

  categoriesContainerHTML.addEventListener("click", (e) => {
    if (e.target !== categoriesContainerHTML) {
      renderWordCards(e.target.getAttribute("index"), isGame);
    }
  });
};

export default renderCategoriesCards;
