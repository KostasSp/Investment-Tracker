import "./StockList.scss";
import "./App.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import UpdateIcon from "@mui/icons-material/Update";

export const CryptoList = (props) => {
  const ticker = ["Meta Data"]["2. Digital Currency Code"];

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
          {Object.keys(props.cryptoData.data).length === 0
            ? null
            : props.cryptoData.data.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <UpdateIcon onClick={() => props.fetch(index)} />
                      <DeleteOutlineIcon
                        style={{ fontSize: "1.4em" }}
                        onClick={() => props.delete(index)}
                      />
                      <ArrowDropUpIcon
                        onClick={() => props.changeOrder(index, "^")}
                      />
                      <ArrowDropDownIcon
                        onClick={() => props.changeOrder(index, "v")}
                      />
                    </td>
                    <td>{order["Meta Data"]["2. Digital Currency Code"]}</td>
                    <td>{order["Meta Data"]["6. Last Refreshed"]}</td>
                    <td>
                      $
                      {order["Time Series Crypto (5min)"][
                        order["Meta Data"]["6. Last Refreshed"]
                      ]["1. open"].slice(0, -3)}
                    </td>

                    <td>
                      $
                      {order["Time Series Crypto (5min)"][
                        order["Meta Data"]["6. Last Refreshed"]
                      ]["4. close"].slice(0, -2)}
                    </td>
                    <td>
                      {percentChange(
                        order["Time Series Crypto (5min)"][
                          order["Meta Data"]["6. Last Refreshed"]
                        ]["1. open"],
                        order["Time Series Crypto (5min)"][
                          order["Meta Data"]["6. Last Refreshed"]
                        ]["4. close"]
                      ).toFixed(2)}
                      %
                      {order["Time Series Crypto (5min)"][
                        order["Meta Data"]["6. Last Refreshed"]
                      ]["4. close"] >
                      order["Time Series Crypto (5min)"][
                        order["Meta Data"]["6. Last Refreshed"]
                      ]["1. open"] ? (
                        <TrendingUpIcon
                          style={{
                            color: "green",
                            marginRight: "6px",
                            position: "relative",
                            top: "5px",
                          }}
                        />
                      ) : (
                        <TrendingDownIcon
                          style={{
                            color: "red",
                            marginRight: "6px",
                            position: "relative",
                            top: "5px",
                          }}
                        />
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
