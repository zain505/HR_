const express = require('express');

const { check } = require('express-validator');

const candidController = require('../controllers.js/candidate_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/pageid=:pageid&pagesize=:pagesize', verifyToken, candidController.getAllRegisteredCandidates);

router.post('/create-candidate', verifyToken, candidController.createCandidate);

router.post('/update-candidate', verifyToken, candidController.updateCandidate);

module.exports = router;
