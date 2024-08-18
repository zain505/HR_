const mongoose = require('mongoose');

const Email = require('../EmailController/Email')

const WorkingHours = require("../Models/workinghours");



const addEmployeeWorkingHour = async (req, res, next) => {

    const { employee_id, working_date,
        work_start_time, work_end_time,
        is_half_day, mark_absent
    } = req.body;

    if (!employee_id) {

        res.status(400).json({ message: "employee id is not correct" });

    } else {
        let WorkingHoursBody = new WorkingHours({
            working_date,
            work_start_time,
            work_end_time,
            mark_absent,
            is_half_day,
            creationDate: Date.now(),
            lastModifyDate: Date.now(),
            employee: employee_id,
        });

        await WorkingHoursBody.save();

        res.status(200).json({ message: "today working hours added" });

    }
}

const updateWorkingHour = async (req, res, next) => {

    const { id, working_date,
        work_start_time, work_end_time,
        is_half_day, mark_absent
    } = req.body;


    let body = {
        working_date,
        work_start_time,
        work_end_time,
        is_half_day,
        mark_absent,
        lastModifyDate: Date.now(),
    };

    const result = await PreArrivalCheckList.findOneAndUpdate(new mongoose.Types.ObjectId(id), body)

    if (result) {
        res.status(200).json({ message: "employee working hour Updated" });

    } else {
        res.status(400).json({ message: "data not updated, something went wrong" });
    }


}

const getWorkingHourOfEmployee = async (req, res, next) => {
    const page = Number(req.params.pageid);

    const pagesize = Number(req.params.pagesize);

    const searchStr = req.params.searchstr;

    let tempAllCandids = [];

    let totalRecords = 0

    if (searchStr == -1) {

        tempAllCandids = await WorkingHours.find({}).
            populate({
                path: "employee",
                match: { isEmployee: true },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });

        totalRecords = tempAllCandids.length;

    } else if (searchStr != -1 && typeof (searchStr) != Number) {

        const regex = new RegExp(searchStr, 'i');

        tempAllCandids = await WorkingHours.find({}).
            populate({
                path: "check_list_for",
                match: { is_candidate_accept_offer: true, full_name: { $regex: regex } },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });

        tempAllCandids = tempAllCandids.filter(el => el.check_list_for != null);

        totalRecords = tempAllCandids.length;
    }


    if ((tempAllCandids.length >= pagesize) && (page >= 1)) {

        let sliceData = tempAllCandids.slice(pagesize * (page - 1), pagesize * page);

        res.status(200).json({ total: totalRecords, data: sliceData });

    } else {

        res.status(200).json({ total: totalRecords, data: tempAllCandids })

    }
}

exports.addEmployeeWorkingHour = addEmployeeWorkingHour;
exports.updateWorkingHour = updateWorkingHour;
exports.getWorkingHourOfEmployee = getWorkingHourOfEmployee;