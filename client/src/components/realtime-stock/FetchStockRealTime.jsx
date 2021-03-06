import { useState, useEffect, useRef } from "react";
import { StockList } from "./RealTimeStockList";
import "../../App.scss";
import { startCounter, resetCounter } from "../../utils/TimeCounterFunctions"; //useMemo these?
import InputField from "../input-field/InputField";
import { StockNameToSymbol } from "../../assets/StockNameToSymbol";
import { filterFetchedItem } from "../../utils/RealtimeFetchUtility";
import ToolTip from "../info-messages/ToolTip";

export const FetchStockRealTime = () => {
  const API_CALL_LIMIT_PER_MINUTE = 4;

  const apiCallCount = useRef(0);

  const [limitReached, setLimitReached] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [lookedUpStock, setLookedUpStock] = useState("");
  const [stockData, setStockData] = useState({
    data: [],
  });

  useEffect(() => {
    fetchStockData(lookedUpStock);
  }, [lookedUpStock]);

  //maybe make this appear only for 5 sec then clean, instead of having it permanently check every 5 sec?
  useEffect(() => {
    const resetErrorMessage = setInterval(() => setErrorMessage(false), 5000);
    return () => clearInterval(resetErrorMessage);
  });

  /* fetches stock data, differentiates between a search for a new item and an update of an existing one and 
  passes the item through a utility function (filterFetchedItem) so that it can be properly displayed on the 
  table. Finally, it increments the api call count and starts the counter (for least waiting time optimisation).
  I could have made a single function handling both stock and crypto fetches , however a different API is 
  utilised for each, and I felt merging it reduced readability a lot (on an already hard-to-read function) */
  const fetchStockData = (current, index) => {
    let stock;
    if (current === "") return;
    typeof index === "undefined"
      ? (stock = current)
      : (stock = stockData.data[index]["Meta Data"]["2. Symbol"]);
    apiCallCount.current >= API_CALL_LIMIT_PER_MINUTE
      ? resetCounter(setLimitReached, apiCallCount) //put the interval functions in a useEffect and clear it, otherwise it constantly run after the first API call
      : fetch(
          `https://investment-tracker-finished.herokuapp.com/realtime-stock-api/${stock}`
        )
          .then((response) => response.json())
          .then((data) =>
            filterFetchedItem(data, stockData.data, setStockData, "2. Symbol")
          )
          .then(apiCallCount.current++)
          .catch((error) => {
            !limitReached && setErrorMessage(true);
            console.log(error);
          });
    startCounter(setLimitReached, apiCallCount);
  };

  //AlphaVantage API does not support search using full stock names, therefore they have to be looked up
  const lookUpStockSymbol = (input) => {
    for (const [key, value] of Object.entries(StockNameToSymbol)) {
      if (`${value.toLowerCase()}`.includes(input.toLowerCase())) {
        setLookedUpStock(`${key}`);
        return;
      }
      setLookedUpStock(input);
    }
  };

  return (
    <div className="main-div">
      <StockList
        stockData={stockData}
        setStockData={setStockData}
        update={fetchStockData}
      />
      <div>
        <InputField
          lookUp={lookUpStockSymbol}
          inputMessage={"stock name or symbol"}
        />
      </div>
      <div className="limit-reached-message">
        {limitReached && //maybe add another condition, if returned API message is error
          "reached update limit, please wait a few seconds"}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {errorMessage && "invalid search, please try again"}
        </div>
      </div>
      <ToolTip message="Some suggestions; Apple, Amazon, Tesla, GOOG, MSFT" />
    </div>
  );
};
