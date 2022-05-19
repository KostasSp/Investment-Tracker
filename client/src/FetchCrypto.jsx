import { useEffect, useState, useRef, useCallback, useDebugValue } from "react";
import { CryptoList } from "./CryptoList";
import "./App.css";
import { DateFormat } from "./DateFormat";
import { ListFunctions } from "./ListFunctions";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

  useEffect(() => {
    if (typeof input == "undefined") return;
    input[0].length < 2 || /\d/.test(input)
      ? setIsValid(false)
      : setIsValid(true);
  }, [input]);

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

  const changeOrder = (index, direction) => {
    let operatorSign = null;
    direction === "^" ? (operatorSign = index - 1) : (operatorSign = index + 1);
    let newArr = [...cryptoData["data"]];
    let holder = newArr[operatorSign];
    if (typeof holder == "undefined") return setCryptoData({ data: newArr });
    newArr[operatorSign] = newArr[index];
    newArr[index] = holder;
    setCryptoData({ data: newArr });
  };

  //the idea is to start a counter as soon as the first api call is made, so that we don't wait full 60 sec when 4 api calls reached
  const startCounter = () => {
    let seconds = 0;
    let test = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        setLimitReached(false);
        clearInterval(test);
        apiCallCount.current = 0;
      }
    }, 1000);
  };

  const resetCounter = () => {
    setInterval(() => (apiCallCount.current = 0), 60000);
    setLimitReached(true);
  };

  const testApiCall = (index) => {
    //22/02 01:54 -> error when I try to update a crypto after I have already updated another one,
    //I THINK it's because the list order of cryptoFetched gets messed up in every call, therefore
    //the cryptoFethed[index] below is incorrect
    fetch(
      `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${cryptoFetched[index]}&market=USD&interval=5min&apikey=${key}`
    )
      .then((response) => response.json())
      .then((data) => newCryptoFetched(data))
      .then(apiCallCount.current++)
      .then(console.log("test API called"));
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
      <CryptoList
        cryptoData={cryptoData}
        delete={deleteRow}
        changeOrder={changeOrder}
        fetch={testApiCall}
      />
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
        {isValid ? (
          <CheckCircleIcon className="check-icon" />
        ) : (
          <h5>At least two characters and no numbers</h5>
        )}
      </span>
    </div>
  );
};
