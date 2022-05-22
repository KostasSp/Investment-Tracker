import { StockNameToSymbol } from "../assets/StockNameToSymbol";

/* Gets 5 random stock symbols at a time from the stock look up object, and passes them to the API. 
Made for the Stock daily updates component.*/
const getRandomStocks = () => {
  let randomNumArr = getRandomNumber(
    0,
    Object.entries(StockNameToSymbol).length
  );
  let tempArr = [];
  for (const [key, value] of Object.entries(StockNameToSymbol)) {
    if (
      !tempArr.includes(`${key}`) &&
      randomNumArr
        .sort()
        .includes(Object.keys(StockNameToSymbol).indexOf(`${key}`))
    )
      tempArr.push(`${key}`);
  }
  return tempArr;
};

const getRandomNumber = (min, max) => {
  let randomNumArr = [];
  min = Math.ceil(min);
  max = Math.floor(max);
  for (let i = 0; i < 5; i++) {
    randomNumArr.push(Math.floor(Math.random() * (max - min) + min));
  }
  return randomNumArr;
};

export default getRandomStocks;
