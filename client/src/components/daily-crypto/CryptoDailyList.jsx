import PropTypes from "prop-types";
import {
  ArrowDropUp,
  ArrowDropDown,
  DeleteOutline,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import "../../App.scss";
import { deleteRow, changeListOrder } from "../../utils/ListFunctions";

export const CryptoDailyList = ({ cryptoData, resultsDisplayed, setCryptoData }) => {
  if (!cryptoData?.data || cryptoData.data.length === 0) {
    return <p>No data available</p>;
  }

  const displayedData = cryptoData.data.slice(0, resultsDisplayed);

  const renderDailyChangeIcon = (priceChange) =>
    priceChange > 0 ? (
      <TrendingUp className="arrow-up" />
    ) : (
      <TrendingDown className="arrow-down" />
    );

  const handleDelete = (index) => deleteRow(index, cryptoData, setCryptoData);
  const handleMoveUp = (index) =>
    changeListOrder(index, index - 1, cryptoData, setCryptoData);
  const handleMoveDown = (index) =>
    changeListOrder(index, index + 1, cryptoData, setCryptoData);

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
          {displayedData.map((data, index) => (
            <tr key={data.id || index}>
              <td>
                <DeleteOutline
                  className="action-icons"
                  onClick={() => handleDelete(index)}
                />
                <ArrowDropUp
                  className="action-icons"
                  onClick={() => handleMoveUp(index)}
                />
                <ArrowDropDown
                  className="action-icons"
                  onClick={() => handleMoveDown(index)}
                />
              </td>
              <td className="cryptolist-image">
                <img src={data.image} alt="icon" />
              </td>
              <td>{data.name}</td>
              <td>{data.last_updated.slice(0, 10)}</td>
              <td>${data.current_price.toFixed(2)}</td>
              <td className="daily-price-change">
                {data.price_change_percentage_24h.toFixed(2)}%
                {renderDailyChangeIcon(data.price_change_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CryptoDailyList.propTypes = {
  cryptoData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        last_updated: PropTypes.string,
        current_price: PropTypes.number,
        price_change_percentage_24h: PropTypes.number,
        price_change_24h: PropTypes.number,
      })
    ),
  }),
  resultsDisplayed: PropTypes.number,
  setCryptoData: PropTypes.func.isRequired,
};
