

const express = require('express');


const router = express.Router();


const { addProductReview, getProductReviews } = require('../../controllers/shop/product-review-controller');


router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);

module.exports = router;