const express = require('express');

const { check } = require('express-validator');

const employeeController = require('../controllers/employee_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/create-employee', verifyToken, employeeController.createEmployeeFromCandid);

router.post('/update-employee', verifyToken, employeeController.updateEmployee);

module.exports = router;
