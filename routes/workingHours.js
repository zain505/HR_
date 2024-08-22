const express = require('express');

const { check } = require('express-validator');

const WorkingHourController = require('../controllers/working_hour_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/add-working-hours', verifyToken, WorkingHourController.addEmployeeWorkingHour);

router.post('/update-add-working-hours', verifyToken, WorkingHourController.updateWorkingHour);

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, WorkingHourController.getWorkingHourOfEmployee);

router.get('/get-employee-working-hour/employee_id=:employee_id&fromDate=:fromDate&endDate=:endDate', verifyToken, WorkingHourController.getWorkingHourOfEmployeeByDate);

router.post('/mark-all-employees-present', verifyToken, WorkingHourController.markAllEmployeesPresent);

module.exports = router;
