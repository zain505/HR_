const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostArrivalCheckList = new Schema({
    
    accommodation_arrangement: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    visa_medical: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    id_card_process: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    work_contract: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    safety_induction_to_candidate: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    issue_ppe: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    agreement_sign: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        additional_info: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
   
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    all_checks_are_completed: { type: Boolean, default: false, required: false },
    check_list_for: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
})

module.exports = mongoose.model('PostArrivalCheckList', PostArrivalCheckList)

