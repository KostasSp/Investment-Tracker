import { useEffect, useState, useRef } from "react";
import "../../App.scss";
import InputField from "../input-field/InputField";
import ToolTip from "../info-messages/ToolTip";
import { RealTimeCryptoList } from "./RealTimeCryptoList";
import { startCounter, resetCounter } from "../../utils/TimeCounterFunctions";
import { CryptoNameToSymbol } from "../../assets/CryptoNameToSymbol";
import {
  filterFetchedItem,
  lookUpCryptoSymbol,
} from "../../utils/RealtimeFetchUtility";

export const FetchCryptoRealTime = () => {
  const API_LIMIT_PER_MINUTE = 4;

  const apiCallCount = useRef(0);

  const [limitReached, setLimitReached] = useState(false);
  const [mappedCrypto, setMappedCrypto] = useState({ symbol: "", icon: "" });
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [cryptoData, setCryptoData] = useState({ data: [] });

  //receives the crypto symbol that was fetched from the lookup object, and passes it to the fetch function
  useEffect(() => {
    fetchCryptoData(mappedCrypto.symbol);
  }, [mappedCrypto]);

  useEffect(() => {
    const resetErrorMessage = setInterval(() => setErrorMessage(false), 5000);
    return () => clearInterval(resetErrorMessage);
  });

  const isNewSearchOrUpdate = (current, index) => {
    let crypto;
    typeof index === "undefined"
      ? (crypto = current)
      : (crypto =
          cryptoData.data[index]["Meta Data"]["2. Digital Currency Code"]);
    fetchCryptoData(crypto);
  };

  /* fetches crypto data, differentiates between a search for a new item and an update of an existing one and 
  passes the item through a utility function (filterFetchedItem) so that it can be properly displayed on the 
  table. Finally, it increments the api call count and starts the counter (for least waiting time optimisation) */
  const fetchCryptoData = (crypto) => {
    if (crypto === "") return;
    if (apiCallCount.current >= API_LIMIT_PER_MINUTE) {
      //put the interval functions in a useEffect and clear it, otherwise it constantly run after the first API call
      resetCounter(setLimitReached, apiCallCount);
      return;
    } else {
      setIsPending(true);
      startCounter(setLimitReached, apiCallCount);
      fetch(
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
        .catch((error) => {
          !limitReached && setErrorMessage(true);
          console.log(error);
        });
      setIsPending(false);
      apiCallCount.current++;
    }
  };

  return (
    <div className="main-div">
      <RealTimeCryptoList
        cryptoData={cryptoData}
        setCryptoData={setCryptoData}
        update={isNewSearchOrUpdate}
      />{" "}
      <ToolTip message="Some suggestions; Bitcoin, Ethereum, Polkadot, ADA, SOL" />
      <InputField
        lookUp={lookUpCryptoSymbol}
        setMappedCrypto={setMappedCrypto}
        inputMessage={"crypto name or symbol"}
      />
      <div className="limit-reached-message">
        {limitReached && "reached update limit, please wait a few seconds"}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {errorMessage && "invalid search, please try again"}
        </div>
      </div>
      {isPending && "getting data..."}
    </div>
  );
};
