const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers.js/user_controller');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
