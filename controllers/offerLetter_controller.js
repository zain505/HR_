// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const OfferLetter = require('../Models/offerletter');

const Candidate = require('../Models/candidate');

const Email = require('../EmailController/Email')

const mongoose = require('mongoose');


const createOfferLetter = async (req, res, next) => {
    const {
        id, basic_salary, food_allowance, transportation_allowance, accommodation_allowance,
        room_type, telephone_allowance, extra_hour_allowance, laundary_allowance, bonus,
        special_allowance, performance_allowance, travelling_allowance, contract_period,
        ticket_allowance, allowance_for,
    } = req.body;

    const findEmailCandid = await Candidate.findOne(new mongoose.Types.ObjectId(id));

    if (!allowance_for || !id) {
        res.status(400).json({ message: "Candidate id is missing or benfit id" });
    } else {
        let body = {
            candidate_status: "Offer Letter Sent"
        }
        await Candidate.findOneAndUpdate(new mongoose.Types.ObjectId(allowance_for), body);
        const newOfferLetter = {
            basic_salary,
            food_allowance,
            transportation_allowance,
            accommodation_allowance,
            room_type,
            telephone_allowance,
            extra_hour_allowance,
            laundary_allowance,
            bonus,
            special_allowance,
            performance_allowance,
            travelling_allowance,
            contract_period,
            ticket_allowance,
            allowance_for,
            offer_letter_status: "Pending",
            is_offer_letter_submit: true,
            is_offer_letter_revise: false
        }

        try {

            const result = await OfferLetter.findByIdAndUpdate(new mongoose.Types.ObjectId(id), newOfferLetter);

            if (result) {
                if (findEmailCandid) {
                    Email.sendEmail(newOfferLetter, findEmailCandid.email, 2);
                    res.status(201).json({ offerletter: newOfferLetter, message: "Offer Letter Created and email sent" });
                } else {
                    res.json({ message: "Offer Letter Created but email not sent for some unkknow reasons" })
                }

            } else {
                res.status(400).json({ message: "offer letter not saved" });
            }

        } catch (error) {
            res.status(400).json({ message: error });
            console.log("something went wrong", error)

        }


    }



}

const reviseOfferLetter = async (req, res, next) => {
    const {
        id, basic_salary, food_allowance, transportation_allowance, accommodation_allowance,
        room_type, telephone_allowance, extra_hour_allowance, laundary_allowance, bonus,
        special_allowance, performance_allowance, travelling_allowance, contract_period,
        ticket_allowance, allowance_for,
    } = req.body;

    let body = {
        candidate_status: "Offer Letter Revised"
    }
    await Candidate.findOneAndUpdate(new mongoose.Types.ObjectId(allowance_for), body);

    const updateBody = {
        basic_salary,
        food_allowance,
        transportation_allowance,
        accommodation_allowance,
        room_type,
        telephone_allowance,
        extra_hour_allowance,
        laundary_allowance,
        bonus,
        special_allowance,
        performance_allowance,
        travelling_allowance,
        contract_period,
        ticket_allowance,
        allowance_for,
        is_offer_letter_submit: true,
        offer_letter_status: "Revise",
        is_offer_letter_revise: true
    }

    try {

        const result = await OfferLetter.findOneAndUpdate(new mongoose.Types.ObjectId(id), updateBody)

        if (result) {
            res.json({ message: "Offer letter revised" });
        } else {
            res.status(400).json({ message: "id is not correct" });
        }

    } catch (error) {
        res.status(400).json({ message: error });
        console.log("something went wrong", error)

    }



}

const getAllBenefitedCandids = async (req, res, next) => {

    const page = Number(req.params.pageid);

    const pagesize = Number(req.params.pagesize);

    const searchStr = req.params.searchstr;

    let benefitsList = [];

    let total = 0;

    if (searchStr == -1) {

        benefitsList = await OfferLetter.find().
            populate({
                path: "allowance_for",
                match: { is_candidate_interview_accept_reject: true, is_candidate_accept_offer: false },
                select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject'
            });

            benefitsList = benefitsList.filter(b=>b.allowance_for!=null)

            total = benefitsList.length;

    } else if (searchStr != -1 && typeof (searchStr) != Number) {

        const regex = new RegExp(searchStr, 'i');

        benefitsList = await OfferLetter.find().
        populate({
            path: "allowance_for",
            match: { full_name: { $regex: regex }, is_candidate_interview_accept_reject: true, is_candidate_accept_offer: false },
            select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject'
        }) 
        benefitsList = benefitsList.filter(b=>b.allowance_for!=null)
        total = benefitsList.length;
    }


    if ((benefitsList.length >= pagesize) && (page >= 1)) {

        let sliceData = benefitsList.slice(pagesize * (page - 1), pagesize * page);

        res.status(200).json({ total: total, data: sliceData });

    } else {

        res.status(200).json({ total: total, data: benefitsList })

    }


}

const createOfferLetterTemplateForInterviewPassedCandid = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ message: "id is not correct" })
    } else {

        const newOfferLetter = new OfferLetter({
            basic_salary: null,
            food_allowance: null,
            transportation_allowance: null,
            accommodation_allowance: null,
            room_type: null,
            telephone_allowance: null,
            extra_hour_allowance: null,
            laundary_allowance: null,
            bonus: null,
            special_allowance: null,
            performance_allowance: null,
            travelling_allowance: null,
            contract_period: null,
            ticket_allowance: null,
            allowance_for: id
        })

        try {

            await newOfferLetter.save();

            res.status(200).json({ message: "offer letter template created" })

        } catch (error) {
            res.status(400).json({ message: error })
            console.log("something went wrong", error);

        }
    }
}

const deletebenifitForCanid = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).json({ message: "id is not correct" });
    } else {
        const result = await OfferLetter.findByIdAndDelete(new mongoose.Types.ObjectId(id))
        if (result) {
            res.status(200).json({ message: "Benefit Deleted" });
        } else {
            res.status(400).json({ message: "No Benefit Found against given id" });
        }
    }
}

exports.createOfferLetter = createOfferLetter;
exports.createOfferLetterTemplateForInterviewPassedCandid = createOfferLetterTemplateForInterviewPassedCandid;
exports.getAllBenefitedCandids = getAllBenefitedCandids
exports.reviseOfferLetter = reviseOfferLetter;
exports.deletebenifitForCanid = deletebenifitForCanid