//gets the first item of the returned API object, which consequently is the latest value the API has to offer
export const latestValue = (arrayOfObjects) =>
  Object.keys(Object.values(arrayOfObjects).slice(-1)[0])[0];

/* Checks whether fetched crypto is new or already exists on the list (and hence updates it), and
  passes down fetched data to the list component (through the cryptoData object) */
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
