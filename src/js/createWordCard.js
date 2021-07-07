
import addToStatistic from './addToStatistic.js';

const createWordCard = (parrent, elementObj, isGame) => {
  if (isGame) {
    const cardHTMLElement = document.createElement('div');
    cardHTMLElement.classList.add('word-card-game');
    const front = document.createElement('div');
    front.classList.add('front');
    front.style = `background-image: url(${elementObj.image})`;
    parrent.append(cardHTMLElement);
    cardHTMLElement.append(front);
  } else {
    const cardHTMLElement = document.createElement('div');
    cardHTMLElement.classList.add('word-card');
    const front = document.createElement('div');
    front.classList.add('front');
    front.style = `background-image: url(${elementObj.image})`;

    const back = document.createElement('div');
    back.classList.add('back');
    back.style = `background-image: url(${elementObj.image})`;

    const rotateButton = document.createElement('div');
    rotateButton.classList.add('rotate-button');
    rotateButton.style = 'background-image: url("assets/img/rotate.svg")';

    const titleEn = document.createElement('div');
    titleEn.classList.add('title-en');
    titleEn.innerText = elementObj.word;

    const titleRu = document.createElement('div');
    titleRu.classList.add('title-ru');
    titleRu.innerText = elementObj.translation;

    const audio = document.createElement('audio');
    audio.setAttribute('preload', 'auto');
    audio.setAttribute('src', `assets/audio/${elementObj.word}.mp3`);

    parrent.append(cardHTMLElement);
    cardHTMLElement.append(front, audio, back);
    front.append(rotateButton, titleEn);
    back.append(titleRu);

    rotateButton.addEventListener('click', (e) => {
      e.target.offsetParent.style.cssText = `background-image: url(${elementObj.image}); transform: rotateY(180deg)`;
      e.target.offsetParent.nextElementSibling.nextElementSibling.style.cssText = `background-image: url(${elementObj.image}); transform: rotateY(360deg); filter: saturate(0%); box-shadow: 0px 0px 20px 2px rgba(191,191,191,1);`;
    });

    cardHTMLElement.addEventListener('click', (e) => {
      addToStatistic(elementObj.word, 'train');
      if (
        e.target === cardHTMLElement
        || (titleEn && e.target !== rotateButton)
      ) {
        let audioEl;
        if (e.target === front) {
          // eslint-disable-next-line prefer-destructuring
          audioEl = e.target.offsetParent.childNodes[1];
        } else {
          audioEl = e.target.offsetParent.nextElementSibling;
        }
        audioEl.play();
      }
    });

    cardHTMLElement.addEventListener('mouseleave', (e) => {
      e.target.firstElementChild.style.cssText = `background-image: url(${elementObj.image}); transform: rotateY(0deg) transform: scale(1.01);`;
      e.target.lastElementChild.style.cssText = `background-image: url(${elementObj.image}); transform: rotateY(180deg) transform: scale(1.01);`;
    });
  }
};
export default createWordCard;
