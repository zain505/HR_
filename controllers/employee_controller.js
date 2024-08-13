// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const Candidate = require('../Models/candidate');

const Employee = require('../Models/employee');

const createEmployeeFromCandid = async (req, res, next) => {
  const { cadid_id, benifit_id } = req.body;

  const findCandidate = await Candidate.findOne(new mongoose.Types.ObjectId(cadid_id));

  if (!findCandidate) {
    res.json({ message: "candidate not found" });
  } else {

    if (findCandidate.isEmployee) {
      res.json({ message: "this candidate is already employee" });
    } else {

      let newEmployee = new Employee({
        isEmployee: true,
        full_name: findCandidate.full_name,
        father_name: findCandidate.father_name,
        email: findCandidate.email,
        contact_1: findCandidate.contact_1,
        contact_2: findCandidate.contact_2,
        address: findCandidate.address,
        department_name: findCandidate.department_name,
        designation: findCandidate.designation,
        experience_in_years: findCandidate.experience_in_years,
        employement_state_date: Date.now(),
        employee_photo: {
          file_base64str: findCandidate.candidate_photo.file_base64str,
          file_name: findCandidate.candidate_photo.file_name
        },
        passport_img: {
          file_base64str: findCandidate.passport_img.file_base64str,
          file_name: findCandidate.passport_img.file_name
        },
        idcard_img: {
          file_base64str: findCandidate.idcard_img.file_base64str,
          file_name: findCandidate.idcard_img.file_name
        },
        licence_img: {
          file_base64str: findCandidate.licence_img.file_base64str,
          file_name: findCandidate.licence_img.file_name
        },
        joining_date: findCandidate.joining_date,
        annual_leaves: findCandidate.annual_leaves,
        casual_leaves: findCandidate.casual_leaves,
        medical_leaves: findCandidate.medical_leaves,
        contract_details: findCandidate.contract_details,
        is_employee_on_reference: findCandidate.is_employee_on_reference,
        reference_name: findCandidate.reference_name,
        budget: findCandidate.budget,
        creationDate: findCandidate.creationDate,
        lastModifyDate: findCandidate.lastModifyDate,
        isContractedEmployee: findCandidate.isContractedEmployee,
        contract_start: findCandidate.contract_start,
        contract_end: findCandidate.contract_end,
        gross_salary: findCandidate.gross_salary,
        creationDate: Date.now(),
        lastModifyDate: Date.now(),
        benefit: benifit_id
      })

      try {

        await newEmployee.save();

        res.json({ message: "new employee created" })

      } catch (error) {
        res.json({ message: "some thing went wrong, employee not saved" });
        console.log(error)
      }
    }
  }
}

const updateEmployee = async (req, res, next) => {

  const { 
    id, full_name, email, contact_1, contact_2, address, father_name, department_name, designation, experience_in_years,
    employee_photo, passport_img, idcard_img, licence_img, joining_date, annual_leaves, casual_leaves,
    medical_leaves, contract_details, is_employee_on_reference, reference_name,
    budget, isContractedEmployee, contract_start, contract_end,
    gross_salary
  } = req.body;

  if (!id) {
    res.json({ message: "id is not correct" })
  } else {

    let body = {
      full_name,
      father_name,
      email,
      contact_1,
      contact_2,
      address,
      department_name,
      designation,
      experience_in_years,
      employee_photo,
      passport_img,
      idcard_img,
      licence_img,
      joining_date,
      annual_leaves,
      casual_leaves,
      medical_leaves,
      contract_details,
      is_employee_on_reference,
      reference_name,
      budget,
      isContractedEmployee,
      contract_start,
      contract_end,
      gross_salary,
      lastModifyDate: Date.now()
    }

    const result = await Employee.findOneAndUpdate(new mongoose.Types.ObjectId(id), body)

    if (result) {
      res.json({ message: "1 record updated" })
    } else {
      res.json({ message: "record not updated" })
    }
  }
}

const getAllEmployeesData = async (req, res, next) => {

  const pageId = Number(req?.params?.pageid);

  const pagesize = Number(req?.params?.pagesize);

  const searchStr = req?.params?.searchstr;

  let tempAllEmployees = [];

  if (searchStr == -1) {

    tempAllEmployees = await Employee.find({}).where("isEmployee").equals(true);

  } else if (searchStr != -1 && typeof (searchStr) != Number) {

    const regex = new RegExp(searchStr, 'i');

    tempAllEmployees = await Employee.find({ full_name: { $regex: regex } }).where("isEmployee").equals(true);
  }


  if ((tempAllEmployees.length >= pagesize) && (page >= 1)) {

    let sliceData = tempAllEmployees.slice(pagesize * (page - 1), pagesize * page);

    res.json(sliceData);

  } else {

    res.json(tempAllEmployees)

  }

}

exports.createEmployeeFromCandid = createEmployeeFromCandid;

exports.updateEmployee = updateEmployee;

exports.getAllEmployeesData = getAllEmployeesData;

