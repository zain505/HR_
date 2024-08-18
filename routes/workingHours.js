const express = require('express');

const { check } = require('express-validator');

const WorkingHourController = require('../controllers/working_hour_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.post('/add-working-hours', verifyToken, WorkingHourController.addEmployeeWorkingHour);

router.post('/update-add-working-hours', verifyToken, WorkingHourController.updateWorkingHour);

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, WorkingHourController.getWorkingHourOfEmployee);

module.exports = router;