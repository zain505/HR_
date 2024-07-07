const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: { type: String, required: true },
    photo : {type:String,required: false},
    passport_img : {type:String,required: true},
    idcard_img : {type:String,required: true},
    licence_img : {type:String,required: true},
    joining_date : {type:String,required: true},
    annual_leaves : {type:Number,required: false},
    casual_leaves : {type:Number,required: false},
    medical_leaves : {type:Number,required: false},
    contract_details : {type:String,required: false},
    budget : {type:Number,required: false},
    creationDate:{type:Date,required:true,default: Date.now},
    lastModifyDate:{type:Date,required:false,default: Date.now}
})

module.exports=mongoose.model('Candidate',CandidateSchema)

