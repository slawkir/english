/* eslint-disable import/prefer-default-export */
export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const getFromLocalStorage = (key) => localStorage.getItem(`${key}`);

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(`${key}`, value);
};
