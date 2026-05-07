import mongoose from "mongoose";

//user schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user',userSchema);