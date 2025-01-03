import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    batch:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    score:{
        type:String,
        required:true,
    },
    studentsPresent:{
        type:Number,
        required:true,
    },
    totalStudent:{
        type:Number,
        required:true,
    }
   
},{timestamps:true})

export const Attendance = mongoose.models.Attendance ?? mongoose.model('Attendance',attendanceSchema)