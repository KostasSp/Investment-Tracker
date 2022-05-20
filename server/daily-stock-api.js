const app = require("express");
const cors = require("cors");
const router = app.Router();
const fetch = require("node-fetch");
require("dotenv").config();

const { API_KEY } = process.env;

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => res.send(data));
});

module.exports = router;
