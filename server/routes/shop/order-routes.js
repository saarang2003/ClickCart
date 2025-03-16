const express = require('express');


const router = express.Router();

const { createOrder, capturePayment, getAllOrderByUser, getOrderDetails } = require('../../controllers/shop/order-controller');


router.post('/create' , createOrder);
router.post('/capture' , capturePayment);
router.get('/list/:userId' , getAllOrderByUser );
router.get('/details/:userId' ,getOrderDetails);


module.exports = router;