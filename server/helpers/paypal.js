// const { Client } = require('@paypal/paypal-server-sdk');

// // A mock database to simulate saving and loading tokens
// const tokenDatabase = {};

// // Function to save the updated token to the database
// const saveTokenToDatabase = (token) => {
//   tokenDatabase.token = token; // Save the new token in our mock database
//   console.log("Token saved to database:", token);
// };

// // Function to load the token from the database
// const loadTokenFromDatabase = () => {
//   return tokenDatabase.token; // Fetch the token from the mock database
// };

// // Create the PayPal Client with OAuth token update callback and token provider
// const client = new Client({
//   // Client ID and Client Secret should be added here
//   clientId: 'ASZVY1BZywDrfihtmQJ5ircCE4Qvvz4L94GyksMn8rhrxSJMdRwxt17i4hzOKyOEGPilNlpndIpOQHWS',
//   clientSecret: 'EEZlL1895Wd2rJlNCAq84MCI-ggN--BpZwRLnAQ0Ku2MVcbzo8R29B7TTnUbvdnr_YWZe45sjuouSy7I',

//   // OAuth token update callback: Save the token when it gets updated
//   oAuthOnTokenUpdate: (token) => {
//     saveTokenToDatabase(token); // Save the updated token to the database
//   },

//   // Custom OAuth token provider
//   oAuthTokenProvider: (lastOAuthToken, authManager) => {
//     // If the last token exists, use it; otherwise, fetch a new one
//     const storedToken = loadTokenFromDatabase();
    
//     if (storedToken) {
//       console.log("Using stored token from the database:", storedToken);
//       return storedToken; // Return the stored token if available
//     } else {
//       console.log("Fetching new token...");
//       // Fetch a new token using the authManager if no stored token exists or it's expired
//       return authManager.fetchToken();
//     }
//   }
// });

// module.exports = client;

const {Client} = require('@paypal/paypal-server-sdk');

const client = new Client({
    clientCredentialsAuthCredentials : {
           oAuthClientId: 'ASZVY1BZywDrfihtmQJ5ircCE4Qvvz4L94GyksMn8rhrxSJMdRwxt17i4hzOKyOEGPilNlpndIpOQHWS',
    oAuthClientSecret: 'EEZlL1895Wd2rJlNCAq84MCI-ggN--BpZwRLnAQ0Ku2MVcbzo8R29B7TTnUbvdnr_YWZe45sjuouSy7I',
    }
});

module.exports = client;