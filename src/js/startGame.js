import { shuffle } from './utils.js';
import { categoryCards, wordsCards } from './data.js';
import renderCategoriesCards from './renderCategoriesCards.js';
import addToStatistic from './addToStatistic.js';

const startGame = () => {
  const correctAudio = new Audio('assets/audio/correct.mp3');
  const errorAudio = new Audio('assets/audio/error.mp3');
  const youWin = new Audio('assets/audio/youWin.mp3');
  const youLose = new Audio('assets/audio/youLose.mp3');
  const wordsContainer = document.querySelector('.words-container');
  const wordCards = document.querySelectorAll('.word-card-game');
  const repeatButton = document.querySelector('.repeat-btn');
  const menuItems = [...document.querySelectorAll('li')];
  const selectCategory = menuItems.find(
    (el) => el.style['text-decoration'] === 'underline',
  ).textContent;
  const currentCategoryIndex = categoryCards.indexOf(selectCategory);
  const raitRow = document.querySelector('.rait');
  const star = document.createElement('img');
  star.setAttribute('src', 'assets/img/star.svg');
  const starWin = document.createElement('img');
  starWin.setAttribute('src', 'assets/img/star-win.svg');
  let errorsCount = 0;

  const gameSet = [];
  wordsCards[currentCategoryIndex].forEach((el, index) => {
    const element = [];
    element.push(el.word);
    element.push(new Audio(`assets/audio/${el.word}.mp3`));
    element.push(index);
    gameSet.push(element);
  });
  const shuffledGameSet = shuffle(gameSet);
  shuffledGameSet[shuffledGameSet.length - 1][1].play();
  repeatButton.addEventListener('click', () => shuffledGameSet[shuffledGameSet.length - 1][1].play());

  wordsContainer.addEventListener('click', (e) => {
    if (
      e.target.parentElement
      === wordCards[shuffledGameSet[shuffledGameSet.length - 1][2]]
    ) {
      e.target.classList.add('black-white');
      e.target.parentElement.style.pointerEvents = 'none';
      correctAudio.play();
      const poped = shuffledGameSet.pop();
      raitRow.prepend(starWin.cloneNode());
      addToStatistic(poped[0], 'true');
      setTimeout(() => {
        if (shuffledGameSet.length > 0) shuffledGameSet[shuffledGameSet.length - 1][1].play();
      }, 1000);
    } else if (e.target !== wordsContainer) {
      errorAudio.play();
      raitRow.prepend(star.cloneNode());
      errorsCount += 1;
      addToStatistic(shuffledGameSet[shuffledGameSet.length-1][0],"false");
    }
    if (shuffledGameSet < 1) {
      if (errorsCount === 0) {
        youWin.play();
        wordsContainer.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
          ">
            <img style="width: 250px;
            margin: 20px;
            "src="assets/img/youWin.png">
          </div>
          `;
        setTimeout(() => {
          raitRow.innerHTML = ' ';
          renderCategoriesCards(true);
        }, 3500);
      } else {
        youLose.play();
        wordsContainer.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
            flex-direction: column
          ">
            <img style="
            width: 300px;
            margin: 20px;
            "src="assets/img/gameOver.png">
            <p style = "font-size: xx-large;">You made ${errorsCount} mistakes</p>
          </div>
          `;
        setTimeout(() => {
          raitRow.innerHTML = ' ';
          renderCategoriesCards(true);
        }, 3500);
      }
    }
  });
};

export default startGame;
