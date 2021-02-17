const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/refresh_token', authController.createTokens);

module.exports = router;
