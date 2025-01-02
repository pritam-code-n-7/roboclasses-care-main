import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    batch:{
        type:String,
        required:true,
    },
    date:{
        type:[String],
        required:true,
    },
    score:{
        type:String,
        required:true,
    },
   
},{timestamps:true})

export const Attendance = mongoose.models.Attendance ?? mongoose.model('Attendance',attendanceSchema)