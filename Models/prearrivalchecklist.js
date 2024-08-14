const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PreArrivalCheckList = new Schema({
    GAMCA_medical_attend_confirmation: {
        confirmation: { type: Boolean, default: false, required: true },
    },
    GAMCA_medical_confirmation_report: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    collect_passport_copy: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    collect_passport_size_photo: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    work_permit_application: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    medical_stamping: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    visa_application: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    sent_visa_to_candidate: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    sent_personal_data_sheet_to_candidate: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    receive_personal_data_sheet_from_candidate: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    ticket_booking: {
        file_str: { type: String, default: "" },
        file_name: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    schedule_candidate_arrival: {
        arrival_date: { type: String, default: "" },
        arrival_time: { type: String, default: "" },
        confirmation: { type: Boolean, default: false, required: true },
    },
    candidate_arrived_and_pickedup: {
        confirmation: { type: Boolean, default: false, required: true },
    },
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    check_list_for: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
})

module.exports = mongoose.model('PreArrivalCheckList', PreArrivalCheckList)

