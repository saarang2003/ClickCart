
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 5000 } = process.env;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";



const generateAccessToken = async () => {
    try {
      const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
      const { data } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, "grant_type=client_credentials", {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return data.access_token;
    } catch (error) {
      console.error("Failed to get PayPal access token:", error.response?.data || error.message);
      throw new Error("Failed to generate PayPal access token");
    }
  };


module.exports = generateAccessToken;