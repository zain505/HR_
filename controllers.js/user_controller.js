// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const User = require('../Models/user')
const Candidate = require('../Models/candidate');




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

const createCandidate = async (req, res, next) => {
  const { name, photo, passport_img, idcard_img, licence_img, joining_date, annual_leaves, casual_leaves, medical_leaves, contract_details, budget } = req.body;

  if (!name || !joining_date || !licence_img || !idcard_img || !passport_img) {
    return;
  }

  const candidate = new Candidate({
    name: name,
    photo: photo,
    passport_img: passport_img,
    idcard_img: idcard_img,
    licence_img: licence_img,
    joining_date: joining_date,
    annual_leaves: annual_leaves,
    casual_leaves: casual_leaves,
    medical_leaves: medical_leaves,
    contract_details: contract_details,
    budget: budget,
  })

  try {
    candidate.save()
  } catch (error) {
    console.log("something went wrong", error)
  }

  res.status(201).json({ candidate: candidate });


};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.createCandidate = createCandidate
