const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/product-controller.js");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get('/get/:id' , getProductDetails);

module.exports = router;