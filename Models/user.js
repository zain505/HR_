const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    creationDate:{type:Date,required:false},
    lastModifyDate:{type:Date,required:false},
    isActive:{type:Boolean,required:true,default:true},
    user_type:{ type: String, required: true }
})

module.exports=mongoose.model('User',UserSchema)

