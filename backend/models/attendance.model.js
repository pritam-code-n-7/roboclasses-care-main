import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    teacher:{
        type:String,
        required:true
    },
    time:{
        type:[String],
        required:true
    },
    batch:{
        type:String,
        required:true
    },
   
},{timestamps:true})

export const Attendance = mongoose.models.Attendance ?? mongoose.model('Attendance',attendanceSchema)