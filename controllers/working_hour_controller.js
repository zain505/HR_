const mongoose = require('mongoose');

const Email = require('../EmailController/Email')

const WorkingHours = require("../Models/workinghours");

const Employees = require("../Models/employee");

const AppUtility = require("../appUtility/appUtility");



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

    let today = AppUtility.formatDate(new Date())

    let finalEmployees = [];

    let finalList = [];

    let totalRecords = 0

    if (searchStr == -1) {
        const allActiveEmployees = await Employees.find({}).where("isEmployee").equals(true);

        const getTodayWorkingHours = await WorkingHours.find({}).where("working_date").equals(today).
            populate({
                path: "employee",
                match: { isEmployee: true },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });
        if (getTodayWorkingHours.length > 0) {
            for (let i = 0; i < allActiveEmployees.length; i++) {
                const ele1 = allActiveEmployees[i];
                for (let j = 0; j < getTodayWorkingHours.length; j++) {
                    const ele2 = getTodayWorkingHours[j];
                    if (String(ele1._id) == String(ele2.employee?._id)) {
                        finalEmployees.push({
                            employee_id: ele2._id,
                            employee_name: ele2.employee.full_name,
                            employee_department: ele2.employee.department_name,
                            employee_email: ele2.employee.email,
                            employee_designation: ele2.employee.designation,
                            working_date: ele2.working_date ? ele2.working_date : null,
                            work_start_time: ele2.work_start_time ? ele2.work_start_time : null,
                            work_end_time: ele2.work_end_time ? ele2.work_end_time : null,
                            is_half_day: ele2.is_half_day ? ele2.is_half_day : null,
                            mark_absent: ele2.mark_absent ? ele2.mark_absent : null
                        });
                    } else {
                        finalEmployees.push({
                            employee_id: ele1._id,
                            employee_name: ele1.full_name,
                            employee_department: ele1.department_name,
                            employee_email: ele1.email,
                            employee_designation: ele1.designation,
                            working_date: ele1.working_date ? ele1.working_date : null,
                            work_start_time: ele1.work_start_time ? ele1.work_start_time : null,
                            work_end_time: ele1.work_end_time ? ele1.work_end_time : null,
                            is_half_day: ele1.is_half_day ? ele1.is_half_day : null,
                            mark_absent: ele1.mark_absent ? ele1.mark_absent : null

                        });
                    }
                }
            }
            totalRecords = finalEmployees.length;

            finalList = finalEmployees
            // res.status(200).json({ total: totalRecords, data: finalEmployees })
        } else {
            totalRecords = allActiveEmployees.length;
            finalList = allActiveEmployees.map(emp => {
                return {
                    employee_id: emp._id,
                    employee_name: emp.full_name,
                    employee_department: emp.department_name,
                    employee_email: emp.email,
                    employee_designation: emp.designation,
                    working_date: emp.working_date ? emp.working_date : null,
                    work_start_time: emp.work_start_time ? emp.work_start_time : null,
                    work_end_time: emp.work_end_time ? emp.work_end_time : null,
                    is_half_day: emp.is_half_day ? emp.is_half_day : null,
                    mark_absent: emp.mark_absent ? emp.mark_absent : null
                }
            })
            // res.status(200).json({ total: totalRecords, data: allActiveEmployees })
        }
    } else if (searchStr != -1 && typeof (searchStr) != Number) {
        const regex = new RegExp(searchStr, 'i');
        const allActiveEmployees = await Employees.find({ full_name: { $regex: regex } }).where("isEmployee").equals(true);

        const getTodayWorkingHours = await WorkingHours.find({}).where("working_date").equals(today).
            populate({
                path: "employee",
                match: { isEmployee: true, full_name: { $regex: regex } },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });
        if (getTodayWorkingHours.length > 0) {
            for (let i = 0; i < allActiveEmployees.length; i++) {
                const ele1 = allActiveEmployees[i];
                for (let j = 0; j < getTodayWorkingHours.length; j++) {
                    const ele2 = getTodayWorkingHours[j];
                    if (String(ele1?._id) == String(ele2.employee?._id)) {
                        finalEmployees.push({
                            employee_id: ele2._id,
                            employee_name: ele2.employee.full_name,
                            employee_department: ele2.employee.department_name,
                            employee_email: ele2.employee.email,
                            employee_designation: ele2.employee.designation,
                            working_date: ele2.working_date ? ele2.working_date : null,
                            work_start_time: ele2.work_start_time ? ele2.work_start_time : null,
                            work_end_time: ele2.work_end_time ? ele2.work_end_time : null,
                            is_half_day: ele2.is_half_day ? ele2.is_half_day : null,
                            mark_absent: ele2.mark_absent ? ele2.mark_absent : null
                        });
                    } else {
                        finalEmployees.push({
                            employee_id: ele1._id,
                            employee_name: ele1.full_name,
                            employee_department: ele1.department_name,
                            employee_email: ele1.email,
                            employee_designation: ele1.designation,
                            working_date: ele1.working_date ? ele1.working_date : null,
                            work_start_time: ele1.work_start_time ? ele1.work_start_time : null,
                            work_end_time: ele1.work_end_time ? ele1.work_end_time : null,
                            is_half_day: ele1.is_half_day ? ele1.is_half_day : null,
                            mark_absent: ele1.mark_absent ? ele1.mark_absent : null

                        });
                    }
                }
            }
            totalRecords = finalEmployees.length;
            finalList = finalEmployees
            // res.status(200).json({ total: totalRecords, data: finalEmployees })
        } else {
            totalRecords = allActiveEmployees.length;
            finalList = allActiveEmployees.map(emp => {
                return {
                    employee_id: emp._id,
                    employee_name: emp.full_name,
                    employee_department: emp.department_name,
                    employee_email: emp.email,
                    employee_designation: emp.designation,
                    working_date: emp.working_date ? emp.working_date : null,
                    work_start_time: emp.work_start_time ? emp.work_start_time : null,
                    work_end_time: emp.work_end_time ? emp.work_end_time : null,
                    is_half_day: emp.is_half_day ? emp.is_half_day : null,
                    mark_absent: emp.mark_absent ? emp.mark_absent : null
                }
            })
            // res.status(200).json({ total: totalRecords, data: allActiveEmployees })
        }
    }

    if ((finalList.length >= pagesize) && (page >= 1)) {

        let sliceData = finalList.slice(pagesize * (page - 1), pagesize * page);

        res.status(200).json({ total: totalRecords, data: sliceData });

    } else {

        res.status(200).json({ total: totalRecords, data: finalList })

    }
}

const getWorkingHourOfEmployeeByDate = async (req, res, next) => {

    const fromDate = req.params.fromDate;

    const endDate = req.params.endDate;

    const employee_id = req.params.employee_id;

    let total = 0;

    if ((!fromDate || !endDate || !employee_id)) {
        res.status(400).json({ message: "All filter fields are required" });
    } else {
        const getTodayWorkingHours = await WorkingHours.find({}).where("working_date").gte(fromDate)
            .where("working_date").lte(endDate).
            populate({
                path: "employee",
                match: { _id: employee_id },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });
        total = getTodayWorkingHours.length;
        res.status(200).json({ total: total, data: getTodayWorkingHours });
    }
}

exports.addEmployeeWorkingHour = addEmployeeWorkingHour;
exports.updateWorkingHour = updateWorkingHour;
exports.getWorkingHourOfEmployee = getWorkingHourOfEmployee;
exports.getWorkingHourOfEmployeeByDate = getWorkingHourOfEmployeeByDate;