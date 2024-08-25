const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeaveApplication = new Schema({
    leave_start_date: { type: String, required: true },
    leave_end_date: { type: String, required: true },
    leave_type: { type: String, required: true },
    leave_reason: { type: String, required: true },
    contact_number: { type: String, required: true },
    total_leave_days: { type: Number, required: false },
    is_leave_approved_by_admin: { type: String, required: false,default:null },
    attachement: { type: String, required: false },
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee',required: true }
})

module.exports = mongoose.model('LeaveApplication', LeaveApplication)

