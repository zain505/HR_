const express = require('express');

const { check } = require('express-validator');

const offerletterController = require('../controllers/offerLetter_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/send-offer-letter', verifyToken, offerletterController.createOfferLetter);

router.get('/create-template-offer-letter&:candid-id=:id', verifyToken, offerletterController.createOfferLetterTemplateForInterviewPassedCandid);

router.post('/revise-offer-letter', verifyToken, offerletterController.reviseOfferLetter);

router.get('/get-all-interview-candids', verifyToken, offerletterController.getAllBenefitedCandids);

router.get('/delete-benefited-candidate&:benifit_id=:id', verifyToken, offerletterController.deletebenifitForCanid);



module.exports = router;
