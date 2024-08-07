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

router.post('/delete-candidate', verifyToken, candidController.deleteCandidate);

router.post('/upload-cv', verifyToken, candidController.uploadCVCandidate);

router.post('/cv-mark-reviewed', verifyToken, candidController.markCVReviewed);

router.post('/cv-result', verifyToken, candidController.updateCVResult);

router.post('/schedule-interview', verifyToken, candidController.scheduleCandidateInterview);

router.post('/marked-Interview',verifyToken, candidController.markedInterview),

router.post('/update-Interview-status',verifyToken, candidController.updateInterviewStatus),

router.get('/get-candidate-by-id=:id',verifyToken, candidController.getSingleCandidateById),

module.exports = router;
