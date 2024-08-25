const express = require('express');

const { check } = require('express-validator');

const leaveController = require('../controllers/leave_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/create-leave', verifyToken, leaveController.applicationForLeave);

router.post('/update-leave', verifyToken, leaveController.updateApplicationForLeave);

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, leaveController.getApplyLeaveApplications);

router.post('/admin-approval', verifyToken, leaveController.LeaveApprovalByAdmin);



module.exports = router;
