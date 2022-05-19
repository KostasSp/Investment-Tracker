import { useEffect, useState, useRef, useCallback, useDebugValue } from "react";
import { CryptoList } from "./CryptoList";
import "./App.css";
import { DateFormat } from "./DateFormat";
import { ListFunctions } from "./ListFunctions";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { startCounter, resetCounter } from "../../utility/TimeCounterFunctions"; //useMemo these?
import InputField from "../input-field/InputField";

export const FetchCrypto = () => {
  const key = process.env.REACT_APP_API_KEY;

  //this is temp solution, also resets on page reload, so will still get too many api call error
  //20/02 update: with the new functionality (new calls get added to the list & update button updates all
  // previously called), this solution is almost pointless - need a more persistent variable (on a server,
  //or maybe in local storage)
  const apiCallCount = useRef(0);

  const [isValid, setIsValid] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [input, setInput] = useState();
  const [cryptoFetched, setCryptoFetched] = useState([]);

  //add to useEffect
  const initialCall = ["BTC", "ETH", "BNB"];

  const [cryptoData, setCryptoData] = useState({
    data: [],
    time1: null,
  });

  const newCryptoFetched = (crypto) => {
    let tempArray;
    console.log(crypto);
    if (crypto === null) return;
    tempArray = [...cryptoData["data"], crypto];
    setCryptoData({
      data: tempArray,
      time1: DateFormat(),
    });
  };

  //deleted stuff still gets recalled with updateCrypto() - to be fixed
  const deleteRow = (index) => {
    let newArr = [...cryptoData["data"]];
    newArr.splice(index, 1);
    setCryptoData({ data: newArr });
  };

  /* for the intraday 5-minute, put the result in local storage, and only allow API call when a call is 
  made after the previous 5 minutes have passed or there is nothing stored in LS, otherwise I'm just
  wasting API calls. This may seem pointless, but I shouldn't block API calls for 5 minutes, bcs maybe
  the result was refreshed or deleted */
  const fetchCryptoData = (current) => {
    if (cryptoFetched.includes(current)) return;
    let cryptoArray = [];
    typeof current == "undefined" //bug after calling at least once, and then trying to call with empty input
      ? (cryptoArray = [...cryptoFetched]) //Promise.all forces me to use arrays & is causing many bugs, perhaps I should use Promise.all for useEffect only when the page loads, and make another normal api call function, without arrays
      : (cryptoArray = [current]); //actually maybe just seperate between bulk call (and use other API for bulk) and real time update call with alphavantage api

    apiCallCount.current === 0 && startCounter();
    apiCallCount.current >= 4
      ? resetCounter()
      : Promise.all(
          cryptoArray.map((crypto) =>
            //for the intraday, make function to call every 5-10 minutes automatically

            fetch(
              `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${crypto}&market=USD&interval=5min&apikey=${key}`
            )
              .then((response) => response.json())
              .then((data) => newCryptoFetched(data))
              .then(apiCallCount.current++)
              .then(console.log("API called"))
          )
        );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {console.log(cryptoFetched)}
      <CryptoList cryptoData={cryptoData} delete={deleteRow} />
      <UpdateIcon
        onClick={() => fetchCryptoData()}
        style={{
          marginTop: "10px",
        }}
      />
      <div>
        <input
          type="search"
          value={input}
          onChange={(e) => setInput([e.target.value])}
          placeholder="get new"
          style={{
            marginTop: "5px",
          }}
        />
        <button
          className="fetch-button"
          onClick={() => [
            fetchCryptoData(input),
            input ? setCryptoFetched([...cryptoFetched, input]) : null,
          ]}
        >
          Request to fetch
        </button>

        {limitReached ? (
          <div>reached crypto update limit, please wait a few seconds</div> //add MUI disabled button here
        ) : null}
      </div>
      <span>
        <InputField inputMessage={"crypto name or symbol"} />
      </span>
    </div>
  );
};
