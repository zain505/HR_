const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkingHour = new Schema({ 
    working_date: { type: String, required: true },
    work_start_time: { type: String, required: true },
    work_end_time: { type: String, required: true },
    is_half_day: { type: Boolean, required: false, default: false },
    mark_absent: { type: Boolean, required: true, default: false },
    creationDate: { type: Date, required: false },
    lastModifyDate: { type: Date, required: false },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
})

module.exports = mongoose.model('WorkingHour', WorkingHour)

