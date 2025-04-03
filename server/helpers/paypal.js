// // helpers/paypal.js
// const axios = require('axios');

// // PayPal API credentials
// const CLIENT_ID = 'ASZVY1BZywDrfihtmQJ5ircCE4Qvvz4L94GyksMn8rhrxSJMdRwxt17i4hzOKyOEGPilNlpndIpOQHWS';
// const CLIENT_SECRET = 'EEZlL1895Wd2rJlNCAq84MCI-ggN--BpZwRLnAQ0Ku2MVcbzo8R29B7TTnUbvdnr_YWZe45sjuouSy7I';
// const BASE_URL = 'https://api-m.sandbox.paypal.com'; // Use sandbox for testing

// // Get access token
// const getAccessToken = async () => {
//   try {
//     const response = await axios({
//       url: `${BASE_URL}/v1/oauth2/token`,
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       auth: {
//         username: CLIENT_ID,
//         password: CLIENT_SECRET,
//       },
//       data: 'grant_type=client_credentials',
//     });
    
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error getting PayPal access token:', error.message);
//     throw new Error('Failed to get PayPal access token');
//   }
// };

// // Create an order
// const createOrder = async (orderData) => {
//   try {
//     const accessToken = await getAccessToken();
    
//     const response = await axios({
//       url: `${BASE_URL}/v2/checkout/orders`,
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//         'PayPal-Request-Id': `order-${Date.now()}`, // Generate a unique ID
//         'Prefer': 'return=representation'
//       },
//       data: orderData
//     });
    
//     return response.data;
//   } catch (error) {
//     console.error('Error creating PayPal order:', error.response?.data || error.message);
//     throw new Error('Failed to create PayPal order');
//   }
// };

// module.exports = {
//   createOrder
// };







// import React, { useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// // Renders errors or successfull transactions on the screen.
// function Message({ content }) {
//     return {content};
// }

// function Paypal() {
//     const initialOptions = {
//         "client-id":
//         "AcoH9sW6f3JMTkF4yLeHY41Fcyk-LhI3tLvwJPUUFwVmmnkBZpUiDQdd_7PFr22cjKHeNjbxcRzzYmva",
//         "enable-funding": "venmo",
//         "disable-funding": "",
//         "buyer-country": "US",
//         currency: "USD",
//         "data-page-type": "product-details",
//         components: "buttons",
//         "data-sdk-integration-source": "developer-studio",
//     };

//     const [message, setMessage] = useState("");

//     return (
//         <div>
//             <PayPalScriptProvider options={initialOptions}>
//                 <PayPalButtons
//                     style={{
//                         shape: "rect",
//                         layout: "vertical",
//                         color: "gold",
//                         label: "paypal",
//                     }} 
//                     createOrder={async () => {
//                         try {
//                             const response = await fetch("/api/orders", {
//                                 method: "POST",
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                 },
//                                 // use the "body" param to optionally pass additional order information
//                                 // like product ids and quantities
//                                 body: JSON.stringify({
//                                     cart: [
//                                         {
//                                             id: "YOUR_PRODUCT_ID",
//                                             quantity: "YOUR_PRODUCT_QUANTITY",
//                                         },
//                                     ],
//                                 }),
//                             });

//                             const orderData = await response.json();

//                             if (orderData.id) {
//                                 return orderData.id;
//                             } else {
//                                 const errorDetail = orderData?.details?.[0];
//                                 const errorMessage = errorDetail
//                                     ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
//                                     : JSON.stringify(orderData);

//                                 throw new Error(errorMessage);
//                             }
//                         } catch (error) {
//                             console.error(error);
//                             setMessage(
//                                 `Could not initiate PayPal Checkout...${error}`
//                             );
//                         }
//                     }} 
//                     onApprove={async (data, actions) => {
//                         try {
//                             const response = await fetch(
//                                 `/api/orders/${data.orderID}/capture`,
//                                 {
//                                     method: "POST",
//                                     headers: {
//                                         "Content-Type": "application/json",
//                                     },
//                                 }
//                             );

//                             const orderData = await response.json();
//                             // Three cases to handle:
//                             //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
//                             //   (2) Other non-recoverable errors -> Show a failure message
//                             //   (3) Successful transaction -> Show confirmation or thank you message

//                             const errorDetail = orderData?.details?.[0];

//                             if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
//                                 // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
//                                 // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
//                                 return actions.restart();
//                             } else if (errorDetail) {
//                                 // (2) Other non-recoverable errors -> Show a failure message
//                                 throw new Error(
//                                     `${errorDetail.description} (${orderData.debug_id})`
//                                 );
//                             } else {
//                                 // (3) Successful transaction -> Show confirmation or thank you message
//                                 // Or go to another URL:  actions.redirect('thank_you.html');
//                                 const transaction =
//                                     orderData.purchase_units[0].payments
//                                         .captures[0];
//                                 setMessage(
//                                     `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
//                                 );
//                                 console.log(
//                                     "Capture result",
//                                     orderData,
//                                     JSON.stringify(orderData, null, 2)
//                                 );
//                             }
//                         } catch (error) {
//                             console.error(error);
//                             setMessage(
//                                 `Sorry, your transaction could not be processed...${error}`
//                             );
//                         }
//                     }} 
//                 />
//             </PayPalScriptProvider>
//             <Message content={message} />
//         </div>
//     );
// }

// export default Paypal; 

const paypal = require('@paypal/paypal-server-sdk');


module.exports = paypal;