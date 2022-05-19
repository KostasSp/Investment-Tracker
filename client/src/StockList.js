import "./StockList.scss";
import "./App.css";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export const StockList = (props) => {
  const today = "2022-02-08"; //make a get current date func, probably through props for dynamic, also not be a weekend

  const percentChange = (open, close) => {
    let result = ((close - open) / open) * 100;
    return result;
  };

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Ticker</th>

            <th>Date</th>
            <th>Price/Open</th>
            <th>Price/Close</th>
            <th>% change</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.stockData).length === 0
            ? null
            : props.stockData.data.map((order, index) => {
                return (
                  <tr index={index}>
                    <td>
                      {" "}
                      <DeleteOutlineIcon
                        style={{ fontSize: "1.4em" }}
                        onClick={() => props.delete(index)}
                      />
                      <ArrowDropUpIcon onClick={() => console.log(index)} />
                      <ArrowDropDownIcon />
                    </td>
                    <td>{order["Meta Data"]["2. Symbol"]}</td>
                    <td>{today}</td>
                    <td>
                      $
                      {order["Time Series (Daily)"][today]["1. open"].slice(
                        0,
                        -2
                      )}
                    </td>
                    <td>
                      $
                      {order["Time Series (Daily)"][today]["4. close"].slice(
                        0,
                        -2
                      )}
                    </td>
                    <td>
                      {percentChange(
                        order["Time Series (Daily)"][today]["1. open"],
                        order["Time Series (Daily)"][today]["4. close"]
                      ).toFixed(2)}
                      %
                      {order["Time Series (Daily)"][today]["4. close"] >
                      order["Time Series (Daily)"][today]["1. open"] ? (
                        <TrendingUpIcon
                          style={{
                            color: "green",
                            marginRight: "6px",
                            position: "relative",
                            top: "5px",
                          }}
                        />
                      ) : (
                        <TrendingDownIcon style={{ color: "red" }} />
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
