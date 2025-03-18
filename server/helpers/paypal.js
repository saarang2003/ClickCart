const paypal = require('@paypal/paypal-server-sdk')

// paypal.configure({
//     mode : "sandbox",
//     client_id : "",
//     client_secret: ""
// })

// const client = new Client({
//     clientCredentialsAuthCredentials: {
//       oAuthClientId: 'OAuthClientId',
//       oAuthClientSecret: 'OAuthClientSecret'
//     },
//     timeout: 0,
//     environment: Environment.Sandbox,
//     logging: {
//       logLevel: LogLevel.Info,
//       logRequest: {
//         logBody: true
//       },
//       logResponse: {
//         logHeaders: true
//       }https://github.com/sangammukherjee/mern-ecommerce-2024/tree/master/server/routes/shop
//     },
//   });



module.exports = paypal;