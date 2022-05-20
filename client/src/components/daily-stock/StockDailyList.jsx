import "../realtime-stocks/RealTimeStockList";
import "../../App.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { deleteRow, changeListOrder } from "../../utility/ListFunctions";
import { latestValue } from "../../utility/RealtimeFetchUtility";

export const StockDailyList = (props) => {
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
            <th>Daily change</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(props.stockData.data).length > 0 &&
            props.stockData.data.map((data, index) => {
              return (
                <tr index={index}>
                  {console.log(data)}
                  <td>
                    {" "}
                    <DeleteOutlineIcon
                      className="action-icons"
                      style={{ fontSize: "1.4em" }}
                      onClick={() =>
                        deleteRow(index, props.stockData, props.setStockData)
                      }
                    />
                    <ArrowDropUpIcon
                      className="action-icons"
                      onClick={() =>
                        changeListOrder(
                          index,
                          index - 1,
                          props.stockData,
                          props.setStockData
                        )
                      }
                    />
                    <ArrowDropDownIcon
                      className="action-icons"
                      onClick={() =>
                        changeListOrder(
                          index,
                          index + 1,
                          props.stockData,
                          props.setStockData
                        )
                      }
                    />
                  </td>
                  <td>{data["Meta Data"]["2. Symbol"]}</td>
                  <td>{latestValue(data)}</td>
                  <td>
                    $
                    {data["Time Series (Daily)"][latestValue(data)][
                      "1. open"
                    ].slice(0, -2)}
                  </td>
                  <td>
                    $
                    {data["Time Series (Daily)"][latestValue(data)]["4. close"]}
                  </td>
                  <td className="daily-price-change">
                    {percentChange(
                      data["Time Series (Daily)"][latestValue(data)]["1. open"],
                      data["Time Series (Daily)"][latestValue(data)]["4. close"]
                    ).toFixed(2)}
                    %
                    {data["Time Series (Daily)"][latestValue(data)][
                      "4. close"
                    ] >
                    data["Time Series (Daily)"][latestValue(data)][
                      "1. open"
                    ] ? (
                      <TrendingUpIcon className="arrow-up" />
                    ) : (
                      <TrendingDownIcon className="arrow-down" />
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
