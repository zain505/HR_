const express = require('express');

const { check } = require('express-validator');

const offerletterController = require('../controllers/offerLetter_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/send-offer-letter', verifyToken, offerletterController.createOfferLetter);

module.exports = router;
