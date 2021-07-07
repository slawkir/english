
const createCategoryCard = (parrent, name, img, isGame, i) => {
  const cardHTMLElement = document.createElement("div");
  if (isGame) {
    cardHTMLElement.classList.add("category-card-game");
  } else {
    cardHTMLElement.classList.add("category-card");
  }
  cardHTMLElement.setAttribute("index", i);
  cardHTMLElement.innerHTML = `
    <img src="${img}" index="${i}">
    <div class="category-card__title" index="${i}">${name}</div>
  `;
  parrent.append(cardHTMLElement);
};
export default createCategoryCard;
