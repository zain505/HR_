// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');

const OfferLetter = require('../Models/offerletter');

const mongoose = require('mongoose');


const createOfferLetter = async (req, res, next) => {
    const {
        basic_salary, food_allowance, transportation_allowance, accommodation_allowance,
        room_type, telephone_allowance, extra_hour_allowance, laundary_allowance, bonus,
        special_allowance, performance_allowance, travelling_allowance, contract_period,
        ticket_allowance
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
        ticket_allowance
    })

    try {

        newOfferLetter.save()

    } catch (error) {

        console.log("something went wrong", error)

    }

    res.status(201).json({ offerletter: newOfferLetter });

}

exports.createOfferLetter = createOfferLetter;