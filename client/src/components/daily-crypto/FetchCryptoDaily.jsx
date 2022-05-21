import { useState, useRef, useEffect } from "react";
import { CryptoDailyList } from "./CryptoDailyList";
import ToolTip from "../info-messages/ToolTip";

const FetchCryptoDaily = () => {
  const numberOfItemsFetched = 100;
  const resultsDisplayedPerClick = 5;

  const apiCallCount = useRef(0);

  const [resultCounter, setResultCounter] = useState(0);
  const [buttonMessage, setButtonMessage] = useState(
    "get top cryptocurrencies"
  );
  const [cryptoData, setCryptoData] = useState({ data: [] });
  const [dataFetched, setDataFetched] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (resultCounter === 0) return;
    setButtonMessage("get more results");
  }, [resultCounter]);

  useEffect(() => {
    if (resultCounter === numberOfItemsFetched) {
      setDisableButton(true);
      setButtonMessage("reached max results");
    }
  }, [resultCounter]);

  const fetchTopCrypto = async (howManyToFetch) => {
    if (dataFetched) return;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${howManyToFetch}&page=1&sparkline=false&price_change_percentage=24h`
    );
    const jsonData = await response.json();
    apiCallCount.current++;
    setCryptoData({ data: jsonData });
  };

  return (
    <div className="main-div">
      <CryptoDailyList
        cryptoData={cryptoData}
        setCryptoData={setCryptoData}
        resultsDisplayed={resultCounter}
      />{" "}
      <ToolTip message="You can search for specific, up-to-date cryptocurrency prices through the sidebar's 1st option" />
      <button
        className="daily-updates-button"
        disabled={disableButton}
        style={{ marginBottom: "65px" }}
        onClick={() => [
          fetchTopCrypto(numberOfItemsFetched),
          setDataFetched(true),
          setResultCounter((counter) => counter + resultsDisplayedPerClick),
        ]}
      >
        {buttonMessage}
      </button>
    </div>
  );
};

export default FetchCryptoDaily;
