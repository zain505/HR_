// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const Candidate = require('../Models/candidate');

const mongoose = require('mongoose');
const candidate = require('../Models/candidate');

const getAllRegisteredCandidates = async (req, res, next) => {

  const page = Number(req.params.pageid);

  const pagesize = Number(req.params.pagesize);

  const searchStr = req.params.searchstr;

  let tempAllCandids = [];

  if (searchStr == -1) {

    tempAllCandids = await Candidate.find({});

  } else if (searchStr != -1 && typeof (searchStr) != Number) {

    const regex = new RegExp(searchStr, 'i');

    tempAllCandids = await Candidate.find({ full_name: { $regex: regex } });
  }


  if ((tempAllCandids.length >= pagesize) && (page >= 1)) {

    let sliceData = tempAllCandids.slice(pagesize * (page - 1), pagesize * page);

    res.json(sliceData);

  } else {

    res.json(tempAllCandids)

  }

}

const createCandidate = async (req, res, next) => {

  const { full_name, father_name, department_name, designation, experience_in_years,
    candidate_photo, passport_img, idcard_img,
    licence_img, joining_date, annual_leaves,
    casual_leaves, medical_leaves,
    is_candidate_on_reference, is_candidate_on_reference_name,
    isEmployee, isContractedEmployee,
    contract_start, contract_end, gross_salary,
    budget }
    =
    req.body;

  if (!full_name || !father_name || !department_name ||
    !joining_date || !licence_img || !idcard_img ||
    !passport_img || !designation || !experience_in_years ||
    !candidate_photo ||
    !casual_leaves ||
    !annual_leaves || !medical_leaves || !budget || !gross_salary) {
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
      isEmployee,
      isContractedEmployee,
      contract_start,
      contract_end,
      casual_leaves,
      annual_leaves,
      medical_leaves,
      budget,
      creationDate: Date.now(),
      lastModifyDate: Date.now(),
      candidate_status: "Created",
      candidate_process_step: 1,
      gross_salary,
    })

    try {

      candidate.save()

    } catch (error) {

      console.log("something went wrong", error)

    }

    res.status(201).json({ candidate: candidate });
  }

};

const updateCandidate = async (req, res, next) => {
  const { id, full_name, father_name, department_name, designation, experience_in_years,
    candidate_photo, passport_img, idcard_img,
    licence_img, joining_date, annual_leaves,
    casual_leaves, medical_leaves, contract_details,
    is_candidate_on_reference, is_candidate_on_reference_name,
    isEmployee, isContractedEmployee,
    contract_start, contract_end, gross_salary,
    budget
  }
    =
    req.body;

  if (!full_name || !father_name || !department_name ||
    !joining_date || !licence_img || !idcard_img ||
    !passport_img || !designation || !experience_in_years ||
    !candidate_photo || !gross_salary ||
    !casual_leaves || !annual_leaves || !medical_leaves || !contract_details || !budget) {

    res.status(400).json({ message: "some fields are missing" });

  } else if (isContractedEmployee && !contract_start && !contract_end) {
    res.status(400).json({ message: "contract start date and end date required" });
  } else if (!id) {
    res.status(400).json({ message: "candidate id is missing" });
  } else {
    const updatedBody = {
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
      isContractedEmployee,
      contract_start,
      contract_end,
      casual_leaves,
      annual_leaves,
      medical_leaves,
      budget,
      lastModifyDate: Date.now(),
      gross_salary
    }



    try {
      await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updatedBody);
    } catch (error) {
      console.log("something went wrong", error)
    }

    res.status(200).json({ message: "1 record update successfully" });
  }
}

const updateCandidateAdminApprovalStatus = async (req, res, next) => {

  const { id, is_candidate_approved_by_admin_for_interview } = req.body;

  let updatedBody = {
    is_candidate_approved_by_admin_for_interview,
    candidate_status: "Aprroved By Admin",
    candidate_process_step: 1
  }

  await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updatedBody)

  res.json({ message: "Candidate approved for interview by admin" });

}

const getAllAdminApprovedCandids = async (req, res, next) => {

  const allAdminApprovedCandids = await Candidate.find({}).where("is_candidate_approved_by_admin_for_interview")
    .equals(true);

  res.json(allAdminApprovedCandids);

}

const deleteCandidate = async (req, res, next) => {
  const { id } = req.body;

  const result = await Candidate.findByIdAndDelete(new mongoose.Types.ObjectId(id));

  if (result == null) {
    res.json({ message: "Id is not correct or id does not exist" });

  } else {
    res.json({ message: "1 record deleted" });

  }




}

const uploadCVCandidate = async (req, res, next) => {
  const { id, candidate_cv } = req.body;

  if (!candidate_cv || !candidate_cv.file_base64str || !candidate_cv.file_name) {
    res.json({ message: "some fields are missing" })
    return;
  }

  let body = {
    candidate_cv: {
      file_base64str: candidate_cv.file_base64str,
      file_name: candidate_cv.file_name
    },
    candidate_status: "CV Under Review",
    candidate_process_step: 2
  }

  let fetchTargetCandid = await Candidate.findOne(new mongoose.Types.ObjectId(id));

  if (!fetchTargetCandid) {

    res.json({ message: "Target Candidate not found" });

  } else if (!fetchTargetCandid.is_candidate_approved_by_admin_for_interview) {

    res.json({ message: "Admin approval required" });

  } else {
    const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);

    if (result == null) {
      res.json({ message: "Id is not correct or id does not exist" });

    } else {
      res.json({ message: "cv file uploaded" });

    }

  }

}

const markCVReviewed = async (req, res, next) => {

  const { id } = req.body;

  let body;

  body = {
    candidate_status: "CV Reviewed",
    candidate_process_step: 3
  }

  let fetchTargetCandid = await Candidate.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (!fetchTargetCandid) {

    res.json({ message: "Target Candidate not found" });

  } else if (!fetchTargetCandid.is_candidate_approved_by_admin_for_interview) {

    res.json({ message: "Admin approval required" });

  } else {
    const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);

    if (result == null) {
      res.json({ message: "Id is not correct or id does not exist" });

    } else {
      res.json({ message: "cv marked reviewed " });

    }

  }

}

const updateCVResult = async (req, res, next) => {
  const { id, candidate_status } = req.body;

  let body;

  if (candidate_status.toString().toUpperCase() == "ACCEPTED") {
    body = {
      candidate_status: "CV Accepted",
      candidate_process_step: 4
    }
  } else if (candidate_status.toString().toUpperCase() == "REJECTED") {
    body = {
      candidate_status: "CV Rejected",
      candidate_process_step: 1
    }
  }

  let fetchTargetCandid = await Candidate.findOne({ _id: new mongoose.Types.ObjectId(id) })

  if (!fetchTargetCandid) {

    res.json({ message: "Target Candidate not found" });

  } else if (!fetchTargetCandid.is_candidate_approved_by_admin_for_interview) {

    res.json({ message: "Admin approval required" });

  } else {
    const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);

    if (result == null) {
      res.json({ message: "Id is not correct or id does not exist" });

    } else {
      res.json({ message: `CV ${candidate_status}` });

    }
  }

}

const scheduleCandidateInterview = async (req, res, next) => {
  const { id, interview_schedule_date, interview_schedule_time, interview_type } = req.body;

  let body;

  body = {
    candidate_status: "Interview scheduled",
    candidate_process_step: 5,
    interview_schedule_date,
    interview_schedule_time,
    interview_type
  }

  const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);

  if (result == null) {
    res.json({ message: "Id is not correct or id does not exist" });

  } else {
    res.json({ message: "interview scheduled" });

  }

}

const markedInterview = async (req, res, next) => {
  const { id,is_candidate_attend_interview } = req.body;

  let body;

  if(is_candidate_attend_interview){
    body = {
      candidate_status: "Interview Done",
      candidate_process_step: 6,
      is_candidate_attend_interview
    }
  }else{
    body = {
      candidate_status: "Candidate Not Appeared",
      candidate_process_step: 5,
      is_candidate_attend_interview
    }
  }

  

  const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);
  if (result == null) {
    res.json({ message: "Id is not correct or id does not exist" });

  } else {
    res.json({ message: "Interview Marked" });

  }
}

const updateInterviewStatus = async (req, res, next) => {
  const { id, is_candidate_interview_accept_reject } = req.body;

  let body;

  if (is_candidate_interview_accept_reject) {
    body = {
      candidate_status: "Candidate Passed",
      candidate_process_step: 7,
      is_candidate_interview_accept_reject
    }
  } else if (!is_candidate_interview_accept_reject) {
    body = {
      candidate_status: "Candidate Rejected",
      candidate_process_step: 6,
      is_candidate_interview_accept_reject
    }
  }
  const result = await Candidate.findByIdAndUpdate(new mongoose.Types.ObjectId(id), body);
  if (result == null) {
    res.json({ message: "Id is not correct or id does not exist" });

  } else {
    res.json({ message: "RECRUITMENT PROCESS COMPLETED" });

  }
}

const getSingleCandidateById = async (req,res,next) =>{
  const id = req.params.id;

  if(!id){
    res.json({message:"id is not correct"})
  } else {
    const result = await candidate.findOne(new mongoose.Types.ObjectId(id));

    if(!result){
      res.json({message:"No Candidate for given id"})
    }else{
      res.json(result)
    }
  }
}

exports.createCandidate = createCandidate;
exports.getAllRegisteredCandidates = getAllRegisteredCandidates;
exports.updateCandidate = updateCandidate;
exports.updateCandidateAdminApprovalStatus = updateCandidateAdminApprovalStatus;
exports.getAllAdminApprovedCandids = getAllAdminApprovedCandids;
exports.deleteCandidate = deleteCandidate;
exports.uploadCVCandidate = uploadCVCandidate;
exports.markCVReviewed = markCVReviewed;
exports.updateCVResult = updateCVResult;
exports.scheduleCandidateInterview = scheduleCandidateInterview;
exports.markedInterview = markedInterview;
exports.updateInterviewStatus = updateInterviewStatus
exports.getSingleCandidateById = getSingleCandidateById