const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

router.get("/quotes/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  
  try {
    const response = await axios.get(
      `${API_URL}/${symbol}/quotes/latest`,
      {
        headers: {
          "APCA-API-KEY-ID": API_KEY,
          "APCA-API-SECRET-KEY": SECRET_KEY,
        },
      });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch quotes",
    });
  };
});


router.get("/bars/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  
  try {
    const response = await axios.get(
      `${API_URL}/${symbol}/bars/latest`,
      {
        headers: {
          "APCA-API-KEY-ID": API_KEY,
          "APCA-API-SECRET-KEY": SECRET_KEY,
        },
      });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch bars",
    });
  };
});
module.exports = router;