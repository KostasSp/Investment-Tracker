//date format required for API calls from AlphaVantage

export const DateFormat = () => {
  const minuteMod = (minute) => {
    minute += "";
    let test = parseInt(minute[1]);
    test >= 5 ? (minute = minute[0] + "5") : (minute = minute[0] + "0");
    return minute;
  };

  const currentDateTime = () => {
    let date = new Date();
    let year = date.getFullYear(),
      month = date.getMonth() + 1, // months are zero indexed
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes();

    if (month < 10) month = "0" + month;
    if (minute < 10) minute = "0" + minute;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;

    minute = minuteMod(minute);

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";
  };
};
