const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/user_controller');

const verifyToken = require('../authMiddleWare/authMiddleWare');

const router = express.Router();

router.get('/pageid=:pageid&pagesize=:pagesize&searchstr=:searchstr', verifyToken, usersController.getUsers);

router.post('/signup', verifyToken,usersController.signup);

router.post('/login', usersController.login);

router.post('/delete-user', verifyToken, usersController.deleteUser);

router.post('/update-user', verifyToken, usersController.updateUser);

router.post('/update-user-status', verifyToken, usersController.updateUserStatus);

module.exports = router;
