const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers.js/user_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/', verifyToken, usersController.getUsers);

router.post('/signup', verifyToken,usersController.signup);

router.post('/login', usersController.login);

module.exports = router;
