const express = require('express');

const { check } = require('express-validator');

const employeeController = require('../controllers/employee_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/make-employee', verifyToken, employeeController.createEmployeeFromCandid);

module.exports = router;
