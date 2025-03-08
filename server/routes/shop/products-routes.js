const express = require("express");

const {
  getFilteredProducts,
} = require("../../controllers/shop/product-controller.js");

const router = express.Router();

router.get("/get", getFilteredProducts);

module.exports = router;