// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const Candidate = require('../Models/candidate');

const mongoose = require('mongoose');


const createEmployeeFromCandid = async (req, res, next) => {
  const { id } = req.body;

  let body;

  body = {
    candidate_status: "Interview Done",
    candidate_process_step: 6,
  }

  const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);
  if (result == null) {
    res.json({ message: "Id is not correct or id does not exist" });

  } else {
    res.json({ message: "Interview Marked" });

  }
}

exports.createEmployeeFromCandid = createEmployeeFromCandid;

