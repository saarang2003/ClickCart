


const express = require('express');

const router = express.Router();


const { addAddress, fetchAllAddress, editAllAddress, deleteAddress }  = require('../../controllers/shop/address-controller');


router.post('/add' , addAddress);
router.get('/get/:userId' , fetchAllAddress);
router.put('/update/:userId/:addressId' , editAllAddress);
router.delete('/delete/:userId/:addressId' , deleteAddress);

module.exports = router;