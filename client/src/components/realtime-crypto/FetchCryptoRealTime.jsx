import { useEffect, useState, useRef } from "react";
import { RealTimeCryptoList } from "./RealTimeCryptoList";
import "../../App.scss";
import InputField from "../input-field/InputField";
import { startCounter, resetCounter } from "../../utils/TimeCounterFunctions"; //useMemo these?
import { CryptoNameToSymbol } from "../../assets/CryptoNameToSymbol";
import { filterFetchedItem } from "../../utils/RealtimeFetchUtility";
import ToolTip from "../info-messages/ToolTip";

export const FetchCryptoRealTime = () => {
  const API_LIMIT_PER_MINUTE = 4;

  const apiCallCount = useRef(0);

  const [limitReached, setLimitReached] = useState(false);
  const [mappedCrypto, setMappedCrypto] = useState({ symbol: "", icon: "" });
  const [errorMessage, setErrorMessage] = useState(false);
  const [cryptoData, setCryptoData] = useState({ data: [] });

  useEffect(() => {
    fetchCryptoData(mappedCrypto.symbol);
  }, [mappedCrypto]);

  useEffect(() => {
    const resetErrorMessage = setInterval(() => setErrorMessage(false), 5000);
    return () => clearInterval(resetErrorMessage);
  });

  /* fetches crypto data, differentiates between a search for a new item and an update of an existing one and 
  passes the item through a utility function (filterFetchedItem) so that it can be properly displayed on the 
  table. Finally, it increments the api call count and starts the counter (for least waiting time optimisation) */
  const fetchCryptoData = (current, index) => {
    let crypto;
    typeof index === "undefined"
      ? (crypto = current)
      : (crypto =
          cryptoData.data[index]["Meta Data"]["2. Digital Currency Code"]);
    if (crypto === "") return;
    apiCallCount.current >= API_LIMIT_PER_MINUTE
      ? resetCounter(setLimitReached, apiCallCount) //put the interval functions in a useEffect and clear it, otherwise it constantly run after the first API call
      : fetch(
          `https://investment-tracker-finished.herokuapp.com/realtime-crypto-api/${crypto}`
        )
          .then((response) => response.json())
          .then((data) =>
            filterFetchedItem(
              data,
              cryptoData.data,
              setCryptoData,
              "2. Digital Currency Code"
            )
          )
          .then(apiCallCount.current++)
          .catch((error) => {
            !limitReached && setErrorMessage(true);
            console.log(error);
          });
    startCounter(setLimitReached, apiCallCount);
  };

  //AlphaVantage API does not support search using full crypto names, therefore they have to be looked up
  const lookUpCryptoSymbol = (input) => {
    for (const [key, value] of Object.entries(CryptoNameToSymbol)) {
      //Unlike stocks, there's a lot of overlap among crypto names, so strict equality is needed
      if (`${value.name.toLowerCase()}` === input.toLowerCase()) {
        setMappedCrypto({ symbol: `${value.symbol}`, icon: `${value.image}` });
        return;
      }
      setMappedCrypto({ symbol: input });
    }
  };

  return (
    <div className="main-div">
      <RealTimeCryptoList
        cryptoData={cryptoData}
        setCryptoData={setCryptoData}
        update={fetchCryptoData}
      />{" "}
      <ToolTip message="Some suggestions; Bitcoin, Ethereum, Polkadot, ADA, SOL" />
      <InputField
        lookUp={lookUpCryptoSymbol}
        inputMessage={"crypto name or symbol"}
      />
      <div className="limit-reached-message">
        {limitReached && "reached update limit, please wait a few seconds"}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {errorMessage && "invalid search, please try again"}
        </div>
      </div>
    </div>
  );
};
