
import { getFromLocalStorage, setToLocalStorage } from './utils';

let statistic = {};
if (getFromLocalStorage('statistic')) {
  statistic = JSON.parse(getFromLocalStorage('statistic'));
}
const addToStatistic = (word, status) => {
  if (!statistic[word]) {
    statistic[word] = {
      train: 0,
      true: 0,
      false: 0,
    };
  } else {
    statistic[word][status] += 1;
  }
  setToLocalStorage('statistic', JSON.stringify(statistic));
};
export default addToStatistic;
