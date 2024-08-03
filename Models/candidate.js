const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    full_name: { type: String, required: true },
    father_name: { type: String, required: true },
    department_name: { type: String, required: true },
    designation: { type: String, required: true },
    experience_in_years: { type: Number, required: true },
    candidate_photo: { type: String, required: false },
    passport_img: { type: String, required: true },
    idcard_img: { type: String, required: true },
    licence_img: { type: String, required: true },
    joining_date: { type: String, required: true },
    annual_leaves: { type: Number, required: false },
    casual_leaves: { type: Number, required: false },
    medical_leaves: { type: Number, required: false },
    contract_details: { type: String, required: false },
    is_candidate_on_reference: { type: Boolean, required: false },
    reference_name: { type: String, required: false },
    budget: { type: Number, required: false },
    creationDate: { type: String, required: false, default: Date.now },
    lastModifyDate: { type: String, required: false, default: Date.now },
    isEmployee: { type: Boolean, required: false, default: false },
    isContractedEmployee: { type: Boolean, required: false, default: false },
    contract_start: { type: String, required: false, default: false },
    contract_end: { type: String, required: false, default: false },
    candidate_cv: { type: String, required: false },
    is_candidate_approved_by_admin_for_interview: { type: Boolean, required: false, default: false },
    
})

module.exports = mongoose.model('Candidate', CandidateSchema)

