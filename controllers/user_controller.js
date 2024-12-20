// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const User = require('../Models/user')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const appConstant = require('../appConstant')




const getUsers = async (req, res, next) => {


  const page = Number(req.params.pageid);

  const pagesize = Number(req.params.pagesize);

  const searchStr = req.params.searchstr;

  let getSignedUpAllUsers = [];

  if (searchStr == -1) {

    getSignedUpAllUsers = await User.find({}).where("user_type").ne("1");

  } else if (searchStr != -1 && typeof (searchStr) != Number) {

    const regex = new RegExp(searchStr, 'i');

    getSignedUpAllUsers = await User.find({ name: { $regex: regex } }).where("user_type").ne("1");
  }


  if ((getSignedUpAllUsers.length >= pagesize) && (page >= 1)) {

    let sliceData = getSignedUpAllUsers.slice(pagesize * (page - 1), pagesize * page);

    res.status(200).json(sliceData);

  } else {

    res.status(200).json(getSignedUpAllUsers)

  }

};

const signup = async (req, res, next) => {

  const { name, email, password, role } = req.body;

  const getSignedUpAllUsers = await User.find({});

  const hasUser = getSignedUpAllUsers.find(u => (u.email === email || u.name === name));

  if (hasUser) {
    res.status(400).json({ message: "user already exists" });
  } else {
    const assignUserType = (type) => {
      let userType = "";
      switch (type) {
        case "admin":
          userType = "2"
          break;
        case "user":
          userType = "3"
          break;
        case "employee":
          userType = "4"
          break;
        default:
          userType = "0"
          break;

      }
      return userType
    }
    const createdUser = new User({

      name,
      email,
      password,
      role,
      creationDate: Date.now(),
      lastModifyDate: Date.now(),
      isActive: true,
      user_type: assignUserType(role)
    });
    try {
      createdUser.save();

    } catch (error) {
      res.status(400).json({ message: error });
    }

    res.status(201).json({ user: createdUser });
  }


};

const login = async (req, res, next) => {
  const { name, password } = req.body;

  const identifiedUser = await User.findOne({ name: name });

  if (!identifiedUser || identifiedUser.password != password) {

    res.status(401).json({ message: 'Could not identify user, credentials seem to be wrong.' });

    return;

  }

  const token = jwt.sign({ data: identifiedUser }, appConstant.secret, {
    expiresIn: "1d",
  });
  identifiedUser.token = token

  res.json({ token });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.body;

  const result = await User.findByIdAndDelete(new mongoose.Types.ObjectId(id));

  if (result == null) {
    res.json({ message: "Id is not correct or id does not exist" });

  } else {
    res.json({ message: "1 record deleted" });

  }

}

const updateUser = async (req, res, next) => {
  const { name, email, password, role, id, } = req.body;

  if (!id) {
    return res.json({ message: "All fields are required" })
  }

  const updateUser = {
    name,
    email,
    password,
    role,
    lastModifyDate: Date.now()
  }

  await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateUser);

  res.json({ message: "record updated" });
}

const updateUserStatus = async (req, res, next) => {
  const { isActive, id } = req.body;

  if (typeof (isActive != Boolean) && !id) {
    return res.json({ message: "All fields are required" })
  }

  const updateUser = {
    isActive,
    lastModifyDate: Date.now()
  }

  await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateUser);

  res.json({ message: "User Status Updated" });
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.updateUserStatus = updateUserStatus;

