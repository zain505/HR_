const express = require('express');

const { check } = require('express-validator');

const candidController = require('../controllers/candidate_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, candidController.getAllRegisteredCandidates);

router.post('/create-candidate', verifyToken, candidController.createCandidate);

router.post('/update-candidate', verifyToken, candidController.updateCandidate);

router.post('/admin-approval-for-candidate', verifyToken, candidController.updateCandidateAdminApprovalStatus);

router.get('/all-admin-approved-candids', verifyToken, candidController.getAllAdminApprovedCandids);

router.get('/delete-candidate', verifyToken, candidController.deleteCandidate);

module.exports = router;
