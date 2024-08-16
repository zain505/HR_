const mongoose = require('mongoose');

const Email = require('../EmailController/Email')

const PreArrivalCheckList = require("../Models/prearrivalchecklist");

const OfferLetter = require("../Models/offerletter");

const Candidate = require("../Models/candidate");



const createTemplatePreArrival = async (req, res, next) => {

    const { candidate_id } = req.body;

    if (!candidate_id) {

        res.json({ message: "candidate id is not correct" });

    } else {
        let body = {
            is_candidate_accept_offer: true,
             candidate_status:"Offer Letter Accepted"
        }
        let result = await Candidate.findOneAndUpdate(new mongoose.Types.ObjectId(candidate_id), body);
        const findCandidate = await Candidate.findOne(new mongoose.Types.ObjectId(candidate_id));
        if (!result || !findCandidate) {
            res.json({ message: "Candidate not found and template not created" });
        } else {


            let preArrivalCheckListBody = new PreArrivalCheckList({
                GAMCA_medical_attend_confirmation: {
                    confirmation: false,
                },
                GAMCA_medical_confirmation_report: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                collect_passport_copy: {
                    file_str: findCandidate?.passport_img.file_base64str,
                    file_name: findCandidate?.passport_img.file_name,
                    confirmation: false,
                },
                collect_passport_size_photo: {
                    file_str: findCandidate?.candidate_photo.file_base64str,
                    file_name: findCandidate?.candidate_photo.file_name,
                    confirmation: false,
                },
                work_permit_application: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                medical_stamping: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                visa_application: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                sent_visa_to_candidate: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                sent_personal_data_sheet_to_candidate: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                receive_personal_data_sheet_from_candidate: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                ticket_booking: {
                    file_str: "",
                    file_name: "",
                    confirmation: false,
                },
                schedule_candidate_arrival: {
                    arrival_date: "",
                    arrival_time: "",
                    confirmation: false,
                },
                candidate_arrived_and_pickedup: {
                    confirmation: false,
                },
                all_checks_are_completed: false,
                creationDate: Date.now(),
                lastModifyDate: Date.now(),
                check_list_for: candidate_id,
            });

            await preArrivalCheckListBody.save();

            res.json({ message: "pre arrival checklist template created" });
        }


    }
}

const updatePreArrivalChecks = async (req, res, next) => {

    const { id, GAMCA_medical_attend_confirmation,
        GAMCA_medical_confirmation_report, collect_passport_copy,
        collect_passport_size_photo, work_permit_application,
        medical_stamping, visa_application, sent_visa_to_candidate,
        sent_personal_data_sheet_to_candidate, receive_personal_data_sheet_from_candidate,
        ticket_booking, schedule_candidate_arrival, candidate_arrived_and_pickedup,
        all_checks_are_completed
    } = req.body;


    let preArrivalCheckListBody = {

        GAMCA_medical_attend_confirmation: {
            confirmation: GAMCA_medical_attend_confirmation.confirmation,
        },
        GAMCA_medical_confirmation_report: {
            file_str: GAMCA_medical_confirmation_report.file_str,
            file_name: GAMCA_medical_confirmation_report.file_name,
            confirmation: GAMCA_medical_confirmation_report.confirmation,
        },
        collect_passport_copy: {
            file_str: collect_passport_copy.file_str,
            file_name: collect_passport_copy.file_name,
            confirmation: collect_passport_copy.confirmation,
        },
        collect_passport_size_photo: {
            file_str: collect_passport_size_photo.file_str,
            file_name: collect_passport_size_photo.file_name,
            confirmation: collect_passport_size_photo.confirmation,
        },
        work_permit_application: {
            file_str: work_permit_application.file_str,
            file_name: work_permit_application.file_name,
            confirmation: work_permit_application.confirmation,
        },
        medical_stamping: {
            file_str: medical_stamping.file_str,
            file_name: medical_stamping.file_name,
            confirmation: medical_stamping.confirmation,
        },
        visa_application: {
            file_str: visa_application.file_str,
            file_name: visa_application.file_name,
            confirmation: visa_application.confirmation,
        },
        sent_visa_to_candidate: {
            file_str: sent_visa_to_candidate.file_str,
            file_name: sent_visa_to_candidate.file_name,
            confirmation: sent_visa_to_candidate.confirmation,
        },
        sent_personal_data_sheet_to_candidate: {
            file_str: sent_personal_data_sheet_to_candidate.file_str,
            file_name: sent_personal_data_sheet_to_candidate.file_name,
            confirmation: sent_personal_data_sheet_to_candidate.confirmation,
        },
        receive_personal_data_sheet_from_candidate: {
            file_str: receive_personal_data_sheet_from_candidate.file_str,
            file_name: receive_personal_data_sheet_from_candidate.file_name,
            confirmation: receive_personal_data_sheet_from_candidate.confirmation,
        },
        ticket_booking: {
            file_str: ticket_booking.file_str,
            file_name: ticket_booking.file_name,
            confirmation: ticket_booking.confirmation,
        },
        schedule_candidate_arrival: {
            arrival_date: schedule_candidate_arrival.arrival_date,
            arrival_time: schedule_candidate_arrival.arrival_time,
            confirmation: schedule_candidate_arrival.confirmation,
        },
        candidate_arrived_and_pickedup: {
            confirmation: candidate_arrived_and_pickedup.confirmation,
        },
        all_checks_are_completed,
        lastModifyDate: Date.now(),
    };

    const result = await PreArrivalCheckList.findOneAndUpdate(new mongoose.Types.ObjectId(id), preArrivalCheckListBody)

    if (result) {
        res.json({ message: "pre arrival checklist Updated" });

    } else {
        res.json({ message: "data not updated, something went wrong" });
    }


}

const getArrivedCandidatesList = async (req, res, next) => {
    const page = Number(req.params.pageid);

    const pagesize = Number(req.params.pagesize);

    const searchStr = req.params.searchstr;

    let tempAllCandids = [];

    let totalRecords = 0

    if (searchStr == -1) {

        tempAllCandids = await PreArrivalCheckList.find({}).
            populate({
                path: "check_list_for",
                match: { is_candidate_accept_offer: true },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject is_candidate_accept_offer'
            });

        totalRecords = tempAllCandids.length;

    } else if (searchStr != -1 && typeof (searchStr) != Number) {

        const regex = new RegExp(searchStr, 'i');

        tempAllCandids = await PreArrivalCheckList.find({}).
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

        res.json({ total: totalRecords, data: sliceData });

    } else {

        res.json({ total: totalRecords, data: tempAllCandids })

    }
}

exports.createTemplatePreArrival = createTemplatePreArrival;
exports.updatePreArrivalChecks = updatePreArrivalChecks;
exports.getArrivedCandidatesList = getArrivedCandidatesList;