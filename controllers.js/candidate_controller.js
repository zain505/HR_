// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const Candidate = require('../Models/candidate');

const getAllRegisteredCandidates = async (req, res, next) => {

  const page = Number(req.params.pageid);

  const pagesize = Number(req.params.pagesize);

  const searchStr = req.params.searchstr;

  const tempAllCandids = await Candidate.find({});

  if (searchStr == -1) {
    if ((tempAllCandids.length > 10) && (page >= 1)) {

      let sliceData = tempAllCandids.slice(pagesize * (page - 1), pagesize * page);

      res.json(sliceData);

    } else {

      res.json(tempAllCandids)

    }

  } else {
    res.json([])
  }







}

const createCandidate = async (req, res, next) => {

  const { full_name, father_name, department_name, designation, experience_in_years,
    candidate_photo, passport_img, idcard_img,
    licence_img, joining_date, annual_leaves,
    casual_leaves, medical_leaves, contract_details,
    is_candidate_on_reference, is_candidate_on_reference_name,
    start_employement_date, isEmployee, isContractedEmployee,
    contract_start, contract_end,
    budget }
    =
    req.body;

  if (!full_name || !father_name || !department_name ||
    !joining_date || !licence_img || !idcard_img ||
    !passport_img || !designation || !experience_in_years ||
    !candidate_photo ||
    !start_employement_date || !casual_leaves ||
    !annual_leaves || !medical_leaves || !contract_details || !budget) {
    res.status(400).json({ message: "some fields are missing" });

  } else if (isContractedEmployee && !contract_start && !contract_end) {
    res.status(400).json({ message: "contract start date and end date required" });
  } else {
    const candidate = new Candidate({
      full_name,
      father_name,
      department_name,
      joining_date,
      licence_img,
      idcard_img,
      passport_img,
      designation,
      experience_in_years,
      candidate_photo,
      is_candidate_on_reference,
      is_candidate_on_reference_name,
      start_employement_date,
      isEmployee,
      isContractedEmployee,
      contract_start,
      contract_end,
      casual_leaves,
      annual_leaves,
      medical_leaves,
      budget
    })

    try {
      candidate.save()
    } catch (error) {
      console.log("something went wrong", error)
    }

    res.status(201).json({ candidate: candidate });
  }

};

const updateCandidate = (req, res, next) => {

}

exports.createCandidate = createCandidate
exports.getAllRegisteredCandidates = getAllRegisteredCandidates
exports.updateCandidate = updateCandidate