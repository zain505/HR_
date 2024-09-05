const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkingHour = new Schema({
    working_date: { type: String, required: false },
    work_start_time: { type: String, required: false, default: null },
    work_end_time: { type: String, required: false, default: null },
    is_half_day: { type: Boolean, required: false, default: null },
    mark_absent: { type: Boolean, required: false, default: null },
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
})

module.exports = mongoose.model('WorkingHour', WorkingHour)

