const express = require('express');

const { check } = require('express-validator');

const PostArrivalChecksController = require('../controllers/post_arrival_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/create-post-arrival-checks-template', verifyToken, PostArrivalChecksController.createTemplatePostArrival);

router.post('/update-post-arrival-checks', verifyToken, PostArrivalChecksController.updatePreArrivalChecks);

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, PostArrivalChecksController.getArrivedCandidatesList);

module.exports = router;
