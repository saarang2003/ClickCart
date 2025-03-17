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
//       }
//     },
//   });



module.exports = paypal;