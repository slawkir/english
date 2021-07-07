import { categoryCards, wordsCards } from './data.js';
import { getFromLocalStorage, setToLocalStorage } from './utils';
import renderWordCards from './renderWordCards.js';

const container = document.querySelector('.cards-container');
const menuLinks = document.querySelectorAll('li');
const statistic = JSON.parse(getFromLocalStorage('statistic'));

const renderStatistic = () => {
  menuLinks.forEach((link) => {
    link.style.textDecoration = 'none';
  });
  menuLinks[menuLinks.length - 1].style.textDecoration = 'underline';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');
  buttonsContainer.innerHTML = `
    <span><button class = "resetButton" >Reset</button></span>
    <span><button class = "repeatDifficultButton" >Repeat difficult</button></span>
  `;

  container.innerHTML = ' ';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <th style="width: 15%;">Category</th>
    <th style="width: 20%;">Word</th>
    <th style="width: 25%;">Translation</th>
    <th style="width: 10%;">Train</th>
    <th style="width: 10%;">Right</th>
    <th style="width: 10%;">Wrong</th>
    <th style="width: 10%;">Errors</th>
  `;
  const tbody = document.createElement('tbody');

  wordsCards.forEach((category, i) => {
    const categoryName = categoryCards[i];
    category.forEach((word) => {
      let trueCount;
      let falseCount;
      const tr = document.createElement('tr');

      const tdCategory = document.createElement('td');
      tdCategory.textContent = categoryName;
      tr.append(tdCategory);

      const tdWord = document.createElement('td');
      tdWord.textContent = word.word;
      tr.append(tdWord);

      const tdTranslation = document.createElement('td');
      tdTranslation.textContent = word.translation;
      tr.append(tdTranslation);

      const tdTrain = document.createElement('td');
      if (statistic !== null && statistic[word.word]) tdTrain.textContent = statistic[word.word].train;
      else tdTrain.textContent = 0;
      tr.append(tdTrain);

      const tdRight = document.createElement('td');
      if (statistic !== null && statistic[word.word]) {
        trueCount = statistic[word.word].true;
        tdRight.textContent = trueCount;
      } else tdRight.textContent = 0;
      tr.append(tdRight);

      const tdWrong = document.createElement('td');
      if (statistic !== null && statistic[word.word]) {
        falseCount = statistic[word.word].false;
        tdWrong.textContent = falseCount;
      } else tdWrong.textContent = 0;
      tr.append(tdWrong);

      const tdPercent = document.createElement('td');
      if (statistic !== null && statistic[word.word] && falseCount !== 0) {
        const percent = (falseCount / (falseCount + trueCount)) * 100;
        tdPercent.textContent = `${parseInt(percent, 10)}%`;
      } else tdPercent.textContent = '';
      tr.append(tdPercent);

      tbody.append(tr);
    });
  });

  table.append(thead);
  table.append(tbody);
  container.append(table);
  container.append(buttonsContainer);

  document.querySelector('.resetButton').addEventListener('click', () => {
    setToLocalStorage('statistic', JSON.stringify({}));
    renderStatistic();
  });
  document
    .querySelector('.repeatDifficultButton')
    .addEventListener('click', () => {
      renderWordCards(7, false);
    });
};
export default renderStatistic;
