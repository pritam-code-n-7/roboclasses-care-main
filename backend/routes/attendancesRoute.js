import express from 'express';
import {Attendance} from "../models/attendance.model.js"
const router = express.Router();

// for attendance module
// create attendance
router.post("/attendances", async (req, res) => {
    try {
      const { batch, date, score, studentsPresent, totalStudent } = req.body;
      const data = await Attendance.create({ batch, date, score, studentsPresent, totalStudent });
      console.log(data);
  
      res.status(201).json({
        success: true,
        message: "Attendance created successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  });
  
  // get attendances
  router.get("/attendances", async (req, res) => {
    try {
      const data = await Attendance.find();
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  });
  
  // get a single attendance
  router.get("/attendances/:id", async (req, res) => {
    try {
      const { id } = req.params();
      const data = await Attendance.findById(id);
      console.log(data);
      res.status(200).json({
        success: true,
        message: "Attendance fetched successfully.",
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  });

  export default router;