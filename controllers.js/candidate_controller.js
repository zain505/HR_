// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const Candidate = require('../Models/candidate');

const getAllRegisteredCandidates = async (req, res, next) =>{

  const getSignedUpAllCandids = await Candidate.find({});

  res.json(getSignedUpAllCandids);
}

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

  exports.createCandidate = createCandidate
  exports.getAllRegisteredCandidates = getAllRegisteredCandidates