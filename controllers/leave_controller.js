const mongoose = require('mongoose');

const Email = require('../EmailController/Email')

const LeaveReqs = require("../Models/LeaveApplication");

const Employees = require("../Models/employee");

const AppUtility = require("../appUtility/appUtility");



const applicationForLeave = async (req, res, next) => {

    const { employee, leave_start_date, leave_end_date,
        leave_type, leave_reason, contact_number,
        attachement
    } = req.body;
    if (!employee || !leave_start_date || !leave_end_date ||
        !leave_type || !leave_reason || !contact_number) {

        res.status(400).json({ message: "All fields are required" });

    } else if (leave_type == "M" && attachement == "") {

        res.status(400).json({ message: "Attachment required" });

    } else {
        try {
            let LeaveApplicationObj = new LeaveReqs({
                employee,
                leave_start_date,
                leave_end_date,
                leave_type,
                total_leave_days:AppUtility.getDays(leave_start_date,leave_end_date),
                leave_reason,
                contact_number,
                attachement,
                creationDate: Date.now(),
                lastModifyDate: Date.now(),
            });

            await LeaveApplicationObj.save();

            res.status(200).json({ message: "Leave applied waiting for admin approval" });
        } catch (error) {
            res.status(400).json({ message: "Leave not applied" });
        }
    }


}

const updateApplicationForLeave = async (req, res, next) => {

    const { id, leave_start_date, leave_end_date,
        leave_type, leave_reason, contact_number,
        attachement
    } = req.body;

    const LeaveRequest = await LeaveReqs.findOne(new mongoose.Types.ObjectId(id));

    if (!id) {
        res.status(400).json({ message: "Leave id is required" });
    } else if (LeaveRequest.is_leave_approved_by_admin) {
        res.status(400).json({ message: "Admin Approved leave can not be updated" });
    } else if (leave_type == "M" && attachement == "") {
        res.status(400).json({ message: "Attachment required" });
    } else {
        try {
            let body = {
                leave_start_date,
                leave_end_date,
                leave_type,
                leave_reason,
                contact_number,
                total_leave_days:AppUtility.getDays(leave_start_date,leave_end_date),
                attachement: attachement,
                lastModifyDate: Date.now(),
                creationDate: Date.now(),
            };

            await LeaveReqs.findOneAndUpdate(new mongoose.Types.ObjectId(id), body)
            res.status(200).json({ message: "Leave request updated" });
        } catch (error) {
            res.status(400).json({ message: "data not updated, something went wrong" });
        }

    }


}

const getApplyLeaveApplications = async (req, res, next) => {
    const page = Number(req.params.pageid);

    const pagesize = Number(req.params.pagesize);

    const searchStr = req.params.searchstr;

    let today = AppUtility.formatDate(new Date());

    let listofAllAppliedLeaveReqs = [];

    let totalRecords = 0

    if (searchStr == -1) {
        listofAllAppliedLeaveReqs = await LeaveReqs.find({}).where("leave_start_date").
            lte(today).where("leave_end_date").gte(today).
            populate({
                path: "employee",
                select: '_id full_name department_name designation'
            })
        totalRecords = LeaveReqs.length
    } else if (searchStr != -1 && typeof (searchStr) != Number) {
        const regex = new RegExp(searchStr, 'i');
        listofAllAppliedLeaveReqs = await LeaveReqs.find({}).where("leave_start_date").
            lte(today).where("leave_end_date").gte(today).
            populate({
                path: "employee",
                match: { full_name: { $regex: regex } },
                select: '_id full_name department_name designation'
            })
        totalRecords = LeaveReqs.length
    }

    if ((listofAllAppliedLeaveReqs.length >= pagesize) && (page >= 1)) {

        let sliceData = listofAllAppliedLeaveReqs.slice(pagesize * (page - 1), pagesize * page);

        res.status(200).json({ total: totalRecords, data: sliceData });

    } else {

        res.status(200).json({ total: totalRecords, data: listofAllAppliedLeaveReqs })

    }

}

const LeaveApprovalByAdmin = async (req, res, next) => {

    const { id, is_leave_approved_by_admin, employee_id, leave_type, noOfDays } = req.body;

    if (!id) {
        res.status(400).json({ message: "bad request" });
    } else if (is_leave_approved_by_admin) {
        let body = {
            is_leave_approved_by_admin
        }

        if (is_leave_approved_by_admin) {
            const TargetedEmployee = await Employees.findOne(new mongoose.Types.ObjectId(employee_id))

            let body;

            if (leave_type == "A") {
                body = {
                    annual_leaves_balance: TargetedEmployee.annual_leaves_balance - noOfDays
                }
            } else if (leave_type == "C") {
                body = {
                    casual_leaves: TargetedEmployee.casual_leaves_balance - noOfDays
                }
            } else if (leave_type == "M") {
                body = {
                    casual_leaves: TargetedEmployee.casual_leaves_balance - noOfDays
                }
            }



        }

        try {
            await LeaveReqs.findOneAndUpdate(new mongoose.Types.ObjectId(id), body)
            await Employees.findOneAndUpdate(new mongoose.Types.ObjectId(employee_id), body);
            res.status(200).json({ message: `Admin has aproved leave` });
        } catch (error) {
            res.status(400).json({ message: "Admin approval failed" });
        }
    } else if (!is_leave_approved_by_admin) {
        let body = {
            is_leave_approved_by_admin
        }
        try {
            await LeaveReqs.findOneAndUpdate(new mongoose.Types.ObjectId(id), body)
            res.status(200).json({ message: `Admin has rejected leave` });
        } catch (error) {
            res.status(400).json({ message: "Admin rejection failed" });
        }
    }

}



exports.getApplyLeaveApplications = getApplyLeaveApplications;
exports.updateApplicationForLeave = updateApplicationForLeave;
exports.applicationForLeave = applicationForLeave;
exports.LeaveApprovalByAdmin = LeaveApprovalByAdmin;