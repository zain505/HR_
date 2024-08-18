const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    full_name: { type: String, required: true },
    father_name: { type: String, required: true },
    email: { type: String, required: true },
    contact_1: { type: String, required: true },
    contact_2: { type: String, required: true },
    address: { type: String, required: true },
    department_name: { type: String, required: true },
    designation: { type: String, required: true },
    experience_in_years: { type: Number, required: true },
    candidate_photo: { file_base64str: { type: String, required: true }, file_name: { type: String, required: true } },
    passport_img: { file_base64str: { type: String, required: true }, file_name: { type: String, required: true } },
    idcard_img: { file_base64str: { type: String, required: true }, file_name: { type: String, required: true } },
    licence_img: { file_base64str: { type: String, required: true }, file_name: { type: String, required: true } },
    joining_date: { type: String, required: true },
    annual_leaves: { type: Number, required: false },
    casual_leaves: { type: Number, required: false },
    medical_leaves: { type: Number, required: false },
    contract_details: { type: String, required: false },
    is_candidate_on_reference: { type: Boolean, required: false },
    reference_name: { type: String, required: false },
    budget: { type: Number, required: false },
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    isEmployee: { type: Boolean, required: false, default: false },
    isContractedEmployee: { type: Boolean, required: false, default: false },
    contract_start: { type: String, required: false, default: false },
    contract_end: { type: String, required: false, default: false },
    candidate_cv: { file_base64str: { type: String, required: false }, file_name: { type: String, required: false } },
    is_candidate_approved_by_admin_for_interview: { type: Boolean, required: false, default: false },
    candidate_status: { type: String, required: false },
    candidate_process_step: { type: Number, required: false },
    gross_salary: { type: String, required: true },
    interview_schedule_date: { type: String, required: false, default: null },
    interview_schedule_time: { type: String, required: false, default: null },
    interview_type: { type: String, required: false, default: null },
    is_candidate_attend_interview: { type: Boolean, required: false, default: false },
    is_candidate_interview_accept_reject: { type: Boolean, required: false, default: false },
    is_candidate_accept_offer:{ type: Boolean, required: false, default: false },
    is_candidate_pre_arrival_checks_completed:{ type: Boolean, required: false, default: false },
    is_candidate_post_arrival_checks_completed:{ type: Boolean, required: false, default: false },
     
})

module.exports = mongoose.model('Candidate', CandidateSchema)

