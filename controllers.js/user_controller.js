// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const User = require('../Models/user')




const getUsers = async (req, res, next) => {
  const getSignedUpAllUsers = await User.find({});
  res.json(getSignedUpAllUsers);
};

const signup = async (req, res, next) => {

  const { name, email, password, role } = req.body;

  const getSignedUpAllUsers = await User.find({});

  const hasUser = getSignedUpAllUsers.find(u => u.email === email);

  if (hasUser) {
    // throw new HttpError('Could not create user, email already exists.', 422);
    return console.log("user exists")
  }

  const createdUser = new User({

    name, // name: name
    email,
    password,
    role
  });
  try {
    createdUser.save();

  } catch (error) {
    console.log('something went wrong', error)
  }

  res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
  const { name, password } = req.body;

  const identifiedUser = await User.findOne({ name: name });

  if (!identifiedUser || identifiedUser.password != password) {

    res.status(401).json({ message: 'Could not identify user, credentials seem to be wrong.' });

    return;

  }

  res.json(identifiedUser);
};



exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

