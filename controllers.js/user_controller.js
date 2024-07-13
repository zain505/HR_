// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const User = require('../Models/user')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const appConstant = require('../appConstant')




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
    role,
    creationDate:Date.now(),
    lastModifyDate:Date.now(),
    isActive:true
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

  const token = jwt.sign({ data: identifiedUser }, appConstant.secret, {
    expiresIn: "1h",
  });
  identifiedUser.token = token

  res.json({ token });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;

  const result =  await User.findByIdAndDelete(new mongoose.Types.ObjectId(id));

  if(result ==  null){
    res.json({ message: "Id is not correct or id does not exist" });

  }else{
    res.json({ message: "1 record deleted" });

  }

}

const updateUser = async (req, res, next) => {
  const { name, email, password, role,id, } = req.body;

  if(!name || !email || !password || !role || !id){
    return res.json({message:"All fields are required"})
  }

  const updateUser = {
    name,
    email,
    password,
    role,
    lastModifyDate:Date.now()
  }

  await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id),updateUser);

  res.json({ message: "record updated" });
}

const updateUserStatus = async (req, res, next) => {
  const { isActive ,id } = req.body;

  if(typeof(isActive != Boolean) && !id){
    return res.json({message:"All fields are required"})
  }

  const updateUser = {
    isActive,
  }

  await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id),updateUser);

  res.json({ message: "User Status Updated" });
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.updateUserStatus = updateUserStatus;

