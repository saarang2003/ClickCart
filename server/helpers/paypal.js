// helpers/paypal.js
const axios = require('axios');

// PayPal API credentials
const CLIENT_ID = 'ASZVY1BZywDrfihtmQJ5ircCE4Qvvz4L94GyksMn8rhrxSJMdRwxt17i4hzOKyOEGPilNlpndIpOQHWS';
const CLIENT_SECRET = 'EEZlL1895Wd2rJlNCAq84MCI-ggN--BpZwRLnAQ0Ku2MVcbzo8R29B7TTnUbvdnr_YWZe45sjuouSy7I';
const BASE_URL = 'https://api-m.sandbox.paypal.com'; // Use sandbox for testing

// Get access token
const getAccessToken = async () => {
  try {
    const response = await axios({
      url: `${BASE_URL}/v1/oauth2/token`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      data: 'grant_type=client_credentials',
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error.message);
    throw new Error('Failed to get PayPal access token');
  }
};

// Create an order
const createOrder = async (orderData) => {
  try {
    const accessToken = await getAccessToken();
    
    const response = await axios({
      url: `${BASE_URL}/v2/checkout/orders`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `order-${Date.now()}`, // Generate a unique ID
        'Prefer': 'return=representation'
      },
      data: orderData
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating PayPal order:', error.response?.data || error.message);
    throw new Error('Failed to create PayPal order');
  }
};

module.exports = {
  createOrder
};