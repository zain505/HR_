const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    full_name: { type: String, required: true },
    father_name: { type: String, required: true },
    department_name: { type: String, required: true },
    email:{ type: String, required: true },
    contact_1:{ type: String, required: true },
    contact_2:{ type: String, required: true },
    address:{ type: String, required: true },
    designation: { type: String, required: true },
    experience_in_years: { type: Number, required: true },
    employee_photo: {file_base64str:{type: String,required:true},file_name:{type: String,required:true}},
    passport_img: {file_base64str:{type: String,required:true},file_name:{type: String,required:true}},
    idcard_img: {file_base64str:{type: String,required:true},file_name:{type: String,required:true}},
    licence_img: {file_base64str:{type: String,required:true},file_name:{type: String,required:true}},
    joining_date: { type: String, required: true },
    employement_state_date: { type: Date, required: true },
    annual_leaves: { type: Number, required: false },
    casual_leaves: { type: Number, required: false },
    medical_leaves: { type: Number, required: false },
    contract_details: { type: String, required: false },
    is_employee_on_reference: { type: Boolean, required: false },
    reference_name: { type: String, required: false },
    budget: { type: Number, required: false },
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    isEmployee: { type: Boolean, required: false, default: false },
    isContractedEmployee: { type: Boolean, required: false, default: false },
    // isEmployee: { type: Boolean, required: false, default: false },
    contract_start: { type: String, required: false, default: false },
    contract_end: { type: String, required: false, default: false },
    gross_salary: { type: String, required: true },
    benefit:{type: mongoose.Schema.Types.ObjectId,ref: 'OfferLetter'}
})

module.exports = mongoose.model('Employee', EmployeeSchema)

