const express = require('express');

const { check } = require('express-validator');

const dashboardController = require('../controllers/dashboard_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/master-info', verifyToken, dashboardController.getAllMasterInfo);

module.exports = router;
