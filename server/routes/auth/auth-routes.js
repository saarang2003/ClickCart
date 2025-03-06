const express = require('express');
const { registerUser } = require('../../controllers/auth-controller');

const router = express.router();

router.post('/register'  , registerUser);

module.exports = router;