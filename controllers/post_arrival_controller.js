const mongoose = require('mongoose');

const Email = require('../EmailController/Email')

const PostArrivalCheckList = require("../Models/postarrivalchecklist")

const Candidate = require("../Models/candidate");



const createTemplatePostArrival = async (req, res, next) => {

    const { candidate_id } = req.body;

    if (!candidate_id) {

        res.status(400).json({ message: "candidate is not correct" });

    } else {
        let body = {
            is_candidate_pre_arrival_checks_completed: true,
        }
        let result = await Candidate.findOneAndUpdate(new mongoose.Types.ObjectId(candidate_id), body);
        if (!result) {
            res.status(400).json({ message: "candidate not found and template not created" });
        } else {
            let postArrivalCheckListBody = new PostArrivalCheckList({
                accommodation_arrangement: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                visa_medical: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                id_card_process: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                work_contract: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                safety_induction_to_candidate: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                issue_ppe: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                agreement_sign: {
                    file_str: "",
                    file_name: "",
                    additional_info: "",
                    confirmation: false,
                },
                all_checks_are_completed: false,
                creationDate: Date.now(),
                lastModifyDate: Date.now(),
                check_list_for: candidate_id,
            });

            await postArrivalCheckListBody.save();

            res.status(200).json({ message: "post arrival checklist template created" });
        }


    }
}

const updatePreArrivalChecks = async (req, res, next) => {

    const { id, accommodation_arrangement,
        visa_medical, id_card_process,
        work_contract, safety_induction_to_candidate,
        issue_ppe, agreement_sign,
        all_checks_are_completed
    } = req.body;


    let preArrivalCheckListBody = {

        accommodation_arrangement: {
            confirmation: accommodation_arrangement.confirmation,
        },
        visa_medical: {
            file_str: visa_medical.file_str,
            file_name: visa_medical.file_name,
            confirmation: visa_medical.confirmation,
        },
        id_card_process: {
            file_str: id_card_process.file_str,
            file_name: id_card_process.file_name,
            confirmation: id_card_process.confirmation,
        },
        work_contract: {
            file_str: work_contract.file_str,
            file_name: work_contract.file_name,
            confirmation: work_contract.confirmation,
        },
        safety_induction_to_candidate: {
            file_str: safety_induction_to_candidate.file_str,
            file_name: safety_induction_to_candidate.file_name,
            confirmation: safety_induction_to_candidate.confirmation,
        },
        issue_ppe: {
            file_str: issue_ppe.file_str,
            file_name: issue_ppe.file_name,
            confirmation: issue_ppe.confirmation,
        },
        agreement_sign: {
            file_str: agreement_sign.file_str,
            file_name: agreement_sign.file_name,
            confirmation: agreement_sign.confirmation,
        },
        all_checks_are_completed,
        check_list_for,
        lastModifyDate: Date.now(),
    };

    const result = await PostArrivalCheckList.findOneAndUpdate(new mongoose.Types.ObjectId(id), preArrivalCheckListBody)

    if (result) {
        res.status(200).json({ message: "pre arrival checklist Updated" });

    } else {
        res.status(400).json({ message: "data not updated, something went wrong" });
    }


}

const getArrivedCandidatesList = async (req, res, next) => {
    const page = Number(req.params.pageid);

    const pagesize = Number(req.params.pagesize);

    const searchStr = req.params.searchstr;

    let tempAllCandids = [];

    let totalRecords = 0

    if (searchStr == -1) {

        tempAllCandids = await PostArrivalCheckList.find({}).
            populate({
                path: "check_list_for",
                match: { is_candidate_pre_arrival_checks_completed: true },
                select: '_id full_name email department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });

        totalRecords = tempAllCandids.length;

    } else if (searchStr != -1 && typeof (searchStr) != Number) {

        const regex = new RegExp(searchStr, 'i');

        tempAllCandids = await PostArrivalCheckList.find({}).
            populate({
                path: "check_list_for",
                match: { is_candidate_pre_arrival_checks_completed: true, full_name: { $regex: regex } },
                select: '_id full_name email department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
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

exports.createTemplatePostArrival = createTemplatePostArrival;
exports.updatePreArrivalChecks = updatePreArrivalChecks;
exports.getArrivedCandidatesList = getArrivedCandidatesList;