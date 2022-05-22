const cors = require("cors");
const express = require("express");
const port = 5000;
const realtimeCryptoRoute = require("./realtime-crypto-api");
const realtimeStockRoute = require("./realtime-stock-api");
const dailyStockRoute = require("./daily-stock-api");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use("/realtime-crypto-api", realtimeCryptoRoute);
app.use("/realtime-stock-api", realtimeStockRoute);
app.use("/daily-stock-api", dailyStockRoute);
app.listen(port, () => console.log(`App listening on port ${port}`));
