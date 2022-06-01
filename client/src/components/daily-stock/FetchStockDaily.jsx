import { useState, useRef, useEffect } from "react";
import { StockDailyList } from "./StockDailyList";
import { startCounter, resetCounter } from "../../utils/TimeCounterFunctions";
import ToolTip from "../info-messages/ToolTip";
import "../input-field/InputField.styles.scss";
import getRandomStocks from "../../utils/GetRandomStocks";

const FetchStockDaily = () => {
  const API_LIMIT_PER_MINUTE = 14;
  const NUM_OF_STOCKS_FETCHED = 5;

  const apiCallCount = useRef(0);

  const [limitReached, setLimitReached] = useState(false);
  const [firstResultsFetched, setFirstResultsFetched] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("get stock prices");
  const [stockData, setStockData] = useState({ data: [] });
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!firstResultsFetched) return;
    setButtonMessage("get more stock prices");
  }, [firstResultsFetched]);

  const fetchDailyStockData = async () => {
    let temp = []; //have to first declare that "temp" is an array, otherwise gives undefined
    temp = getRandomStocks();
    console.log(temp);
    if (apiCallCount.current >= API_LIMIT_PER_MINUTE) {
      resetCounter(setLimitReached, apiCallCount);
      return;
    }
    setIsPending(true);
    const requests = temp.map((stock) =>
      fetch(
        `https://investment-tracker-finished.herokuapp.com/daily-stock-api/${stock}`
      )
    );
    startCounter(setLimitReached, apiCallCount);
    const responses = await Promise.all(requests);
    const promises = responses.map((response) => response.json());
    const data = await Promise.all(promises);
    apiCallCount.current += NUM_OF_STOCKS_FETCHED;
    setIsPending(false);
    setStockData({ data: [...stockData.data, ...data] });
  };

  return (
    <div className="main-div">
      <StockDailyList stockData={stockData} setStockData={setStockData} />
      <button
        className="daily-updates-button"
        onClick={() => [fetchDailyStockData(), setFirstResultsFetched(true)]}
      >
        {isPending ? "getting data..." : buttonMessage}
      </button>
      <div className="limit-reached-message" style={{ marginBottom: "65px" }}>
        {limitReached && //maybe add another condition, if returned API message is error
          "reached update limit, please wait a few seconds"}
        {/* when limit hit, add "switch to realtime stock updates" and vice versa on the realtime on the limitReached message */}
      </div>
      <ToolTip message="You can search for specific, up-to-date stock prices through the sidebar's 2nd option" />
    </div>
  );
};

export default FetchStockDaily;
