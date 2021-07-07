/* eslint-disable import/extensions */

import { wordsCards } from "./data.js";
import createWordCard from "./createWordCard.js";
import startGame from "./startGame.js";

const cardsContainer = document.querySelector(".cards-container");
const menuLinks = document.querySelectorAll("li");

const renderWordCards = (categoryIndex, isGame) => {
  menuLinks.forEach((link) => {
    link.style.textDecoration = "none";
  });
  menuLinks[parseInt(categoryIndex) + 1].style.textDecoration = "underline";
  cardsContainer.innerHTML = " ";
  const wordsContainerHTML = document.createElement("div");

  wordsCards[categoryIndex].forEach((element) => {
    createWordCard(wordsContainerHTML, element, isGame);
  });
  wordsContainerHTML.classList.add("words-container");

  if (isGame) {
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.innerHTML = `
      <button class="start-btn">Start Game</button>
      <button class="repeat-btn"></button>
    `;
    cardsContainer.append(wordsContainerHTML);
    cardsContainer.append(btnContainer);
    document.querySelector(".start-btn").addEventListener("click", () => {
      document.querySelector(".start-btn").style.display = "none";
      document.querySelector(".repeat-btn").style.cssText =
        "display: block; background-image: url(img/rotate.svg)";
      startGame();
    });
  } else {
    cardsContainer.append(wordsContainerHTML);
  }
};

export default renderWordCards;
