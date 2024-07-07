const express = require('express');
const { check } = require('express-validator');

const candidController = require('../controllers.js/candidate_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/', verifyToken, candidController.getAllRegisteredCandidates)

router.post('/create-candidate', verifyToken, candidController.createCandidate)

module.exports = router;
