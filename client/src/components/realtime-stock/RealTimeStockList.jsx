import "./RealTimeStockList";
import "../../App.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { deleteRow, changeListOrder } from "../../utils/ListFunctions";
import { Tooltip } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { latestValue } from "../../utils/RealtimeFetchUtility";

export const StockList = (props) => {
  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Symbol</th>
            <th>Datetime (UTC)</th>
            <th>Price</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {/* I believe this is still working while empty (just before the data comes through), because .data 
          is initialised as an empty array - although it doesn't break the app, it's not recommended */}
          {props.stockData.data?.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  {" "}
                  <Tooltip title="Update value">
                    <UpdateIcon
                      className="action-icons"
                      onClick={() => props.update(null, index)}
                    />
                  </Tooltip>
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
                <td>{data["Meta Data"]["2. Symbol"].toUpperCase()}</td>
                <td>{latestValue(data)}</td>
                <td>
                  $
                  {data["Time Series (5min)"][latestValue(data)][
                    "4. close"
                  ].slice(0, -2)}
                </td>
                <td className="daily-price-change">
                  {data["Time Series (5min)"][latestValue(data)]["4. close"] >
                  data["Time Series (5min)"][latestValue(data)]["1. open"] ? (
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
