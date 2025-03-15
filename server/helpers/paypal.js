const paypal = require('paypal-server-sdk');

paypal.configure({
    mode : "sandbox",
    client_id : "",
    client_secret: ""
})

module.exports = paypal;