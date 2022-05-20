import { useState, useRef, useEFfect } from "react";
import { StockList } from "./RealTimeStockList";
import "../../App.scss";
import { filterFetchedItem } from "../../utils/RealtimeFetchUtility";
import { startCounter, resetCounter } from "../../utils/TimeCounterFunctions"; //useMemo these?

export const FetchStockRealTime = () => {
  const key = process.env.REACT_APP_API_KEY;

  const API_CALL_LIMIT_PER_MINUTE = 4;

  const apiCallCount = useRef(0);
  const [limitReached, setLimitReached] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [stockData, setStockData] = useState({ data: [] });

  const fetchStockData = (current, index) => {
    let stock;
    if (current === "") return;
    typeof index === "undefined"
      ? (stock = current)
      : (stock = stockData.data[index]["Meta Data"]["2. Symbol"]);
    apiCallCount.current >= API_CALL_LIMIT_PER_MINUTE
      ? resetCounter(setLimitReached, apiCallCount) //put the interval functions in a useEffect and clear it, otherwise it constantly run after the first API call
      : fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${key}`
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

  return (
    <div>
      <StockList stockData={stockData} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="fetch-button" onClick={() => fetchStockData()}>
          Request to fetch
        </button>
      </div>
    </div>
  );
};
