const mongoose = require('mongoose');

const Email = require('../EmailController/Email')

const WorkingHours = require("../Models/workinghours");

const LeaveApplication = require("../Models/LeaveApplication");

const Employees = require("../Models/employee");

const AppUtility = require("../appUtility/appUtility");



const addEmployeeWorkingHour = async (req, res, next) => {

    const { employee_id, working_date,
        work_start_time, work_end_time,
        is_half_day, mark_absent
    } = req.body;

    let today = AppUtility.formatDate(new Date())

    const todayWorkingHoursList = await WorkingHours.find({}).where("working_date").equals(today);

    const isIncomingEmployeeMarkedTodayHour = todayWorkingHoursList.find(el => el?.employee?.toString() == employee_id?.toString());


    if (!employee_id || isIncomingEmployeeMarkedTodayHour) {

        res.status(400).json({ message: "employee id is not correct or working hour already added" });

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

    const result = await WorkingHours.findOneAndUpdate(new mongoose.Types.ObjectId(id), body);

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
                const activeEmployee = allActiveEmployees[i];

                const findEmployeeInWorkingHourList = getTodayWorkingHours.find(el => el?.employee?._id?.toString() == activeEmployee?._id?.toString());

                if (findEmployeeInWorkingHourList) {
                    finalEmployees.push({
                        _whid: findEmployeeInWorkingHourList._id,
                        working_date: findEmployeeInWorkingHourList.working_date,
                        work_start_time: findEmployeeInWorkingHourList.work_start_time,
                        work_end_time: findEmployeeInWorkingHourList.work_end_time,
                        is_half_day: findEmployeeInWorkingHourList.is_half_day,
                        mark_absent: findEmployeeInWorkingHourList.mark_absent,
                        employee_id: activeEmployee._id,
                        employee_name: activeEmployee.full_name,
                        employee_department: activeEmployee.department_name,
                        employee_email: activeEmployee.email,
                        employee_designation: activeEmployee.designation,
                    })
                } else {
                    finalEmployees.push({
                        employee_id: activeEmployee._id,
                        employee_name: activeEmployee.full_name,
                        employee_department: activeEmployee.department_name,
                        employee_email: activeEmployee.email,
                        employee_designation: activeEmployee.designation,
                        working_date: null,
                        work_start_time: null,
                        work_end_time: null,
                        is_half_day: null,
                        mark_absent: null

                    })
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
                const activeEmployee = allActiveEmployees[i];

                const findEmployeeInWorkingHourList = getTodayWorkingHours.find(el => el?.employee?._id.toString() == activeEmployee._id.toString());

                if (findEmployeeInWorkingHourList) {
                    finalEmployees.push({
                        _whid: findEmployeeInWorkingHourList._id,
                        working_date: findEmployeeInWorkingHourList.working_date,
                        work_start_time: findEmployeeInWorkingHourList.work_start_time,
                        work_end_time: findEmployeeInWorkingHourList.work_end_time,
                        is_half_day: findEmployeeInWorkingHourList.is_half_day,
                        mark_absent: findEmployeeInWorkingHourList.mark_absent,
                        employee_id: activeEmployee._id,
                        employee_name: activeEmployee.full_name,
                        employee_department: activeEmployee.department_name,
                        employee_email: activeEmployee.email,
                        employee_designation: activeEmployee.designation,
                    })
                } else {
                    finalEmployees.push({
                        employee_id: activeEmployee._id,
                        employee_name: activeEmployee.full_name,
                        employee_department: activeEmployee.department_name,
                        employee_email: activeEmployee.email,
                        employee_designation: activeEmployee.designation,
                        working_date: null,
                        work_start_time: null,
                        work_end_time: null,
                        is_half_day: null,
                        mark_absent: null

                    })
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

    const fd = AppUtility.formDate(fromDate)
    const td = AppUtility.formDate(endDate)

    let total = 0;

    if ((!fromDate || !endDate || !employee_id)) {
        res.status(400).json({ message: "All filter fields are required" });
    } else {
        const getTodayWorkingHours = await WorkingHours.find({}).
            populate({
                path: "employee",
                match: { _id: employee_id },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });
        const removeNullEmployees = getTodayWorkingHours.filter(el => el?.employee != null);
        const filterByDate = removeNullEmployees.filter(el => {
            return new Date(AppUtility.formatDate(el.working_date)).toISOString() >= fd.toISOString() && new Date(AppUtility.formatDate(el.working_date)).toISOString() <= td.toISOString();
        });
        total = filterByDate.length;
        res.status(200).json({ total: total, data: filterByDate });
    }
}

const markAllEmployeesPresent = async (req, res, next) => {
    let today = AppUtility.formatDate(new Date())

    const allEmployeesList = await Employees.find({}).where("isEmployee").equals(true);

    const todayWorkingHourListOfAllEmp = await WorkingHours.find({}).where("working_date").equals(today);

    const todayLeaveEmployee = await LeaveApplication.find({}).where("leave_start_date").
        lte(today).where("leave_end_date").gte(today);

    const workingHourList = [];

    if (Array.isArray(allEmployeesList)) {
        for (let i = 0; i < allEmployeesList.length; i++) {
            const emp = allEmployeesList[i];
            const findTodayHour = todayWorkingHourListOfAllEmp?.find(empp => empp?.employee?._id.toString() == emp._id.toString());
            const isEmployeeOnLeave = todayLeaveEmployee?.some(el => (el.employee?._id.toString() == emp._id.toString()) && el.is_leave_approved_by_admin);
            if (isEmployeeOnLeave && !findTodayHour) {
                workingHourList.push({
                    working_date: today,
                    work_start_time: " ",
                    work_end_time: " ",
                    is_half_day: false,
                    mark_absent: true,
                    creationDate: Date.now(),
                    lastModifyDate: Date.now(),
                    employee: emp._id
                })
            } else {
                if (emp && emp._id && !findTodayHour) {
                    workingHourList.push({
                        working_date: today,
                        work_start_time: "9:00 AM",
                        work_end_time: "6:00 PM",
                        is_half_day: false,
                        mark_absent: false,
                        creationDate: Date.now(),
                        lastModifyDate: Date.now(),
                        employee: emp._id
                    })
                }

            }
        }
        let result;
        if (workingHourList.length > 0) {
            result = WorkingHours.insertMany(workingHourList);
        }
        if (result) {
            res.status(200).json({ message: "All Records updated" });
        } else if (workingHourList.length == 0) {
            res.status(409).json({ message: "All Employees already marked for today date if you want to update please select specific employee(s)" });
        } else {
            res.status(400).json({ message: "Records not updated" });
        }
    } else {
        res.status(400).json({ message: "Employees not found attendance not updated" });
    }
}

exports.addEmployeeWorkingHour = addEmployeeWorkingHour;
exports.updateWorkingHour = updateWorkingHour;
exports.getWorkingHourOfEmployee = getWorkingHourOfEmployee;
exports.getWorkingHourOfEmployeeByDate = getWorkingHourOfEmployeeByDate;
exports.markAllEmployeesPresent = markAllEmployeesPresent