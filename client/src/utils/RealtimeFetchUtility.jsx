import { CryptoNameToSymbol } from "../assets/CryptoNameToSymbol";

//gets the first item of the returned API object, which consequently is the latest value the API has to offer
export const latestValue = (arrayOfObjects) =>
  Object.keys(Object.values(arrayOfObjects).slice(-1)[0])[0];

/*gets crypto icon (which is stored in the CryptoNameToSymbol object), so that it can be aggregated with 
  AlphaVantage's real-time API data*/
export const lookUpCryptoIcon = (input) => {
  let temp = "";
  for (const [key, value] of Object.entries(CryptoNameToSymbol)) {
    //Unlike stocks, there's a lot of overlap among crypto names, so strict equality is needed
    if (`${value.name.toLowerCase()}` === input.toLowerCase()) {
      temp = `${value.image}`;
      return temp;
    }
  }
};

//AlphaVantage API does not support search using full crypto names, therefore they have to be looked up
export const lookUpCryptoSymbol = (input, setMappedCrypto) => {
  for (const [key, value] of Object.entries(CryptoNameToSymbol)) {
    //Unlike stocks, there's a lot of overlap among crypto names, so strict equality is needed
    if (`${value.name.toLowerCase()}` === input.toLowerCase()) {
      setMappedCrypto({ symbol: `${value.symbol}`, icon: `${value.image}` });
      return;
    }
    setMappedCrypto({ symbol: input });
  }
};

/* Checks whether fetched item is new or already exists on the list (and hence updates it), and
  passes down fetched data to the list component (through the updateState object) */
export const filterFetchedItem = (
  stockOrCryptoFetched,
  existingItemsArray,
  updateState,
  apiPath
) => {
  if (stockOrCryptoFetched === null) return;
  let symbol = stockOrCryptoFetched["Meta Data"][`${apiPath}`].toLowerCase();
  let condition = false;
  for (let item of existingItemsArray)
    if (item["Meta Data"][`${apiPath}`].toLowerCase() === symbol)
      condition = true;
  /*the if block below is necessary for updating already fetched items, instead of adding (and therefore 
  duplicating) them at the end of the list*/
  if (condition) {
    const updatedList = existingItemsArray.map((currentItem) =>
      currentItem["Meta Data"][`${apiPath}`].toLowerCase() === symbol
        ? stockOrCryptoFetched
        : currentItem
    );
    updateState({
      data: updatedList,
    });
  } else {
    updateState({
      data: [...existingItemsArray, stockOrCryptoFetched],
    });
  }
};
