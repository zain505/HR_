const express = require('express');
const { check } = require('express-validator');

const candidController = require('../controllers.js/candidate_controller');

const router = express.Router();

router.get('/',candidController.getAllRegisteredCandidates)

router.post('/create-candidate',candidController.createCandidate)

module.exports = router;
