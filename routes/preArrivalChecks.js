const express = require('express');

const { check } = require('express-validator');

const PreArrivalChecksController = require('../controllers/pre_arrival_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/create-pre-arrival-checks-template', verifyToken, PreArrivalChecksController.createTemplatePreArrival);

router.post('/update-pre-arrival-checks', verifyToken, PreArrivalChecksController.updatePreArrivalChecks);

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, PreArrivalChecksController.getArrivedCandidatesList);

module.exports = router;
