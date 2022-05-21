import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import "../../App.scss";
import { deleteRow, changeListOrder } from "../../utils/ListFunctions";

export const CryptoDailyList = (props) => {
  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Icon</th>
            <th>Symbol</th>
            <th>Date</th>
            <th>Price</th>
            <th>Daily change</th>
          </tr>
        </thead>

        <tbody>
          {props.cryptoData.data.length > 0 &&
            props.cryptoData.data
              .slice(0, props.resultsDisplayed)
              .map((data, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <DeleteOutlineIcon
                        className="action-icons"
                        style={{ fontSize: "1.4em" }}
                        onClick={() =>
                          deleteRow(
                            index,
                            props.cryptoData,
                            props.setCryptoData
                          )
                        }
                      />
                      <ArrowDropUpIcon
                        className="action-icons"
                        onClick={() =>
                          changeListOrder(
                            index,
                            index - 1,
                            props.cryptoData,
                            props.setCryptoData
                          )
                        }
                      />
                      <ArrowDropDownIcon
                        className="action-icons"
                        onClick={() =>
                          changeListOrder(
                            index,
                            index + 1,
                            props.cryptoData,
                            props.setCryptoData
                          )
                        }
                      />
                    </td>
                    <td className="cryptolist-image">
                      <img src={data["image"]} alt="icon"></img>
                    </td>
                    <td>{data["name"]}</td>
                    <td>{data["last_updated"].slice(0, 10)}</td>
                    <td>${data["current_price"].toFixed(2)}</td>
                    <td className="daily-price-change">
                      {data["price_change_percentage_24h"].toFixed(2)}%
                      {data["price_change_24h"] > 0 ? (
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
