import { useState } from "react";
import { StockList } from "./StockList";
import "./App.scss";

export const FetchStock = () => {
  const key = process.env.REACT_APP_API_KEY;
  const currentStock = ["AAPL", "COIN", "TSLA", "AMZN", "GOOGL"];

  const [stockData, setStockData] = useState({ data: [] });

  const addNewStock = (stock) => {
    let newArray = stockData["data"];
    newArray.push(stock);
    setStockData({ data: newArray });
  };

  const deleteRow = (index) => {
    let newArr = [...stockData["data"]];
    newArr.splice(index, 1);
    setStockData({ data: newArr });
  };

  //add a useRef to keep track of max 500 api calls daily, and max 5 at a time or per min
  //also cache stocks already requested for that day, and bring it over instead of making API call everytime
  //maybe if !currentFive.includes(stock), then Promise.all
  const fetchStockData = () => {
    Promise.all(
      currentStock.map((stock) =>
        fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${key}`
        )
          .then((response) => response.json())
          .then((data) => addNewStock(data))
      )
    );
  };

  return (
    <div>
      {/* {console.log(apiData)} */}
      <StockList stockData={stockData} delete={deleteRow} />
      {/* centering failed because i was trying to center the button
       (which probably ended up centering IN the component), 
       instead of the whole component */}
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
