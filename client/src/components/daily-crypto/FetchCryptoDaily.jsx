import { useState, useRef } from "react";
import { CryptoDailyList } from "./CryptoDailyList";
import ToolTip from "../info-messages/ToolTip";

const FetchCryptoDaily = () => {
  const numberOfItemsFetched = 100;
  const resultsDisplayedPerClick = 5;
  const apiCallCount = useRef(0);

  const [resultCounter, setResultCounter] = useState(0);
  const [cryptoData, setCryptoData] = useState({ data: [] });
  const [dataFetched, setDataFetched] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const fetchTopCrypto = async (howManyToFetch) => {
    if (dataFetched) return;
    setIsPending(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${howManyToFetch}&page=1&sparkline=false&price_change_percentage=24h`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      apiCallCount.current++;
      setCryptoData({ data: jsonData });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleButtonClick = () => {
    if (!dataFetched) {
      fetchTopCrypto(numberOfItemsFetched);
      setDataFetched(true);
    }
    setResultCounter((prev) => prev + resultsDisplayedPerClick);
  };

  const maxResults =
    cryptoData.data.length > 0
      ? Math.min(numberOfItemsFetched, cryptoData.data.length)
      : numberOfItemsFetched;

  const buttonText = isPending
    ? "getting data..."
    : !dataFetched
    ? "get top cryptocurrencies"
    : resultCounter >= maxResults
    ? "reached max results"
    : "get more results";

  const isDisabled = isPending || (dataFetched && resultCounter >= maxResults);

  return (
    <div className="main-div">
      <CryptoDailyList
        cryptoData={cryptoData}
        setCryptoData={setCryptoData}
        resultsDisplayed={resultCounter}
      />
      <ToolTip message="You can search for specific, up-to-date cryptocurrency prices through the sidebar's 1st option" />
      <button
        className="daily-updates-button"
        disabled={isDisabled}
        style={{ marginBottom: "65px" }}
        onClick={handleButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FetchCryptoDaily;
