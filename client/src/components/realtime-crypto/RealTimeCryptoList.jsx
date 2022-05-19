import "../../App.scss";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Tooltip } from "@mui/material";
import { deleteRow, changeListOrder } from "../../utils/ListFunctions";
import { CryptoNameToSymbol } from "../../assets/CryptoNameToSymbol";
import { latestValue } from "../../utils/RealtimeFetchUtility";

export const RealTimeCryptoList = (props) => {
  /*gets crypto icon (which is stored in the CryptoNameToSymbol object), so that it can be aggregated with 
  AlphaVantage's real-time API data*/
  const lookUpCryptoIcon = (input) => {
    let temp = "";
    for (const [key, value] of Object.entries(CryptoNameToSymbol)) {
      //Unlike stocks, there's a lot of overlap among crypto names, so strict equality is needed
      if (`${value.name.toLowerCase()}` === input.toLowerCase()) {
        temp = `${value.image}`;
        return temp;
      }
    }
  };

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Icon</th>
            <th>Symbol</th>
            <th>Datetime (UTC)</th>
            <th>Price</th>
            <th>Trend (1min)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.cryptoData.data).length > 0 &&
            props.cryptoData.data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Tooltip title="Update value">
                      <UpdateIcon
                        className="action-icons"
                        onClick={() => props.update(null, index)}
                      />
                    </Tooltip>
                    <DeleteOutlineIcon
                      className="action-icons"
                      onClick={() =>
                        deleteRow(index, props.cryptoData, props.setCryptoData)
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
                    <img
                      src={lookUpCryptoIcon(
                        data["Meta Data"]["3. Digital Currency Name"]
                      )}
                      alt="icon"
                    ></img>
                  </td>
                  <td>{data["Meta Data"]["2. Digital Currency Code"]}</td>
                  <td>{latestValue(data)}</td>
                  <td>
                    $
                    {data["Time Series Crypto (1min)"][latestValue(data)][
                      "4. close"
                    ].slice(0, -2)}
                  </td>
                  <td className="daily-price-change">
                    {data["Time Series Crypto (1min)"][latestValue(data)][
                      "4. close"
                    ] >
                    data["Time Series Crypto (1min)"][latestValue(data)][
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
