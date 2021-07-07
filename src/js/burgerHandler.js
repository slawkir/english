
import { categoryCards } from './data.js';
import renderWordCards from './renderWordCards.js';
import renderCategoriesCards from './renderCategoriesCards.js';
import renderStatistic from './renderStatistic.js';

const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const modeCheckbox = document.querySelector('.custom-control-input');

const burgerHandler = () => {
  [burger, overlay].forEach((element) => {
    element.addEventListener('click', () => {
      burger.classList.toggle('clicked');
      menu.classList.toggle('show');
      overlay.classList.toggle('show');
      body.classList.toggle('overflow');
    });
  });
  menu.addEventListener('click', (e) => {
    if (e.target !== menu) {
      const index = categoryCards.indexOf(e.target.textContent);
      if (index === -1 && e.target.innerText === 'Statistic') {
        renderStatistic();
      } else if (index === -1) {
        if (modeCheckbox.checked) {
          renderCategoriesCards(true);
        } else {
          renderCategoriesCards(false);
        }
      } else if (modeCheckbox.checked) {
        renderWordCards(index, true);
      } else {
        renderWordCards(index, false);
      }
      burger.classList.remove('clicked');
      menu.classList.remove('show');
      overlay.classList.remove('show');
      body.classList.remove('overflow');
    }
  });
};
export default burgerHandler;
