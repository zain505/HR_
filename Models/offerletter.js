const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OfferLetterSchema = new Schema({
    basic_salary:{type:String,default:null,required:false},
    food_allowance:{type:String,default:null,required:false},
    transportation_allowance:{type:String,default:null,required:false},
    accommodation_allowance:{type:String,default:null,required:false},
    room_type:{type:String,default:null,required:false}, //sharing or inidividual
    telephone_allowance:{type:String,default:null,required:false},
    extra_hour_allowance:{type:String,default:null,required:false},
    laundary_allowance:{type:String,default:null,required:false},
    bonus:{type:String,default:null,required:false},
    special_allowance:{type:String,default:null,required:false},
    performance_allowance:{type:String,default:null,required:false},
    travelling_allowance:{type:String,default:null,required:false},
    contract_period:{type:String,default:null,required:false},
    ticket_allowance:{type:String,default:null,required:false},
    allowance_for:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    }
})

module.exports = mongoose.model('OfferLetter', OfferLetterSchema)

