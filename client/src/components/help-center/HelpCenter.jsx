import React from "react";
import "./HelpCenter.scss";

const HelpCenter = () => {
  return (
    <div className="help-center">
      {" "}
      <strong>
        <u>Guidance on using this App</u>
      </strong>{" "}
      <p>
        This Investment Tracker project is a search engine that allows the user
        to get up-to-date stock and cryptocurrency values. You can request lists
        containing daily values of popular stocks and cryptocurrencies, as well
        as their up-to-date values.
      </p>
      <p>
        Using it is simple; you are first directed to the real-time
        cryptocurrency updates page (which has the most information to offer to
        the user). If you are unsure on what to search for, there are some
        suggestions on the top right corner, next to the table. You can then
        navigate to the daily cryptocurrency updates page through the sidebar
        (3rd option), as well as the real-time and daily stock market updates
        (2nd and 4th option, respectively).
      </p>
    </div>
  );
};

export default HelpCenter;
