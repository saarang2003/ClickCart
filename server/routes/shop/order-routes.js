const express = require('express');


const router = express.Router();

const {  capturePayment, getAllOrdersByUser, getOrderDetails, createOrder } = require('../../controllers/shop/order-controller');



router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);


module.exports = router;