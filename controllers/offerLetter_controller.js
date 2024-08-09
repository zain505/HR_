// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const OfferLetter = require('../Models/offerletter');

const Candidate = require('../Models/candidate');

const mongoose = require('mongoose');


const createOfferLetter = async (req, res, next) => {
    const {
        basic_salary, food_allowance, transportation_allowance, accommodation_allowance,
        room_type, telephone_allowance, extra_hour_allowance, laundary_allowance, bonus,
        special_allowance, performance_allowance, travelling_allowance, contract_period,
        ticket_allowance, allowance_for,
    } = req.body;

    const newOfferLetter = new OfferLetter({
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
        is_offer_letter_submit:true,
        offer_letter_status:"Pending",
        is_offer_letter_revise:false
    })

    try {

        newOfferLetter.save()

    } catch (error) {

        console.log("something went wrong", error)

    }

    res.status(201).json({ offerletter: newOfferLetter });

}

const reviseOfferLetter = async (req, res, next) => {
    const {
        id,basic_salary, food_allowance, transportation_allowance, accommodation_allowance,
        room_type, telephone_allowance, extra_hour_allowance, laundary_allowance, bonus,
        special_allowance, performance_allowance, travelling_allowance, contract_period,
        ticket_allowance, allowance_for,
    } = req.body;

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
        is_offer_letter_submit:true,
        offer_letter_status:"Revise",
        is_offer_letter_revise:true
    }

    try {

        const result = await OfferLetter.findOneAndUpdate(new mongoose.Types.ObjectId(id), updateBody)

        if(result){
            res.json({ message: "Offer letter revised" });
        }else{
            res.json({ message: "id is not correct" });
        }

    } catch (error) {

        console.log("something went wrong", error)

    }

    

}

const getAllBenefitedCandids = async (req, res, next) => {

    const results = await OfferLetter.find().
        populate({
            path: "allowance_for",
            match: { is_candidate_interview_accept_reject: true },
            select: '_id full_name department_name designation experience_in_years is_candidate_interview_accept_reject'
        });

    if (Array.isArray(results)) {

        let finalsResults = results.filter(el => el.allowance_for != null)

        res.json(finalsResults);
    } else {

        res.json([]);

    }

}

exports.createOfferLetter = createOfferLetter;
exports.getAllBenefitedCandids = getAllBenefitedCandids
exports.reviseOfferLetter = reviseOfferLetter