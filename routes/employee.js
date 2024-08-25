const express = require('express');

const { check } = require('express-validator');

const employeeController = require('../controllers/employee_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/create-employee', verifyToken, employeeController.createEmployeeFromCandid);

router.post('/update-employee', verifyToken, employeeController.updateEmployee);

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, employeeController.getAllEmployeesData);

router.get('/get-employee:employee_id=:employee_id', verifyToken, employeeController.getAllEmployeesData);

router.get('/all-employees', verifyToken, employeeController.getAllEmployeesDataWithNoPagination);



module.exports = router;
