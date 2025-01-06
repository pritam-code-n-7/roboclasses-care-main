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
  
      return res.status(201).json({
        success: true,
        message: "Attendance created successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
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
     return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    return  res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  });
  
  // get a single attendance
  router.get("/attendances/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Attendance.findById(id);
      console.log(data);
      return res.status(200).json({
        success: true,
        message: "Attendance fetched successfully.",
        data
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Internal server error!",
      });
    }
  });

  // update an attendance
router.put("/attendances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { batch, date, score, studentsPresent, totalStudent } = req.body;
    const data = await Attendance.findByIdAndUpdate(
      id,
      { batch, date, score, studentsPresent, totalStudent },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Attendance successfully updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// partially update an appointment
router.patch("/attendances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Attendance.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Attendance partially updated.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// delete an appointment
router.delete("/attendances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Attendance.findByIdAndDelete(id);
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Attendance successfully deleted.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

  export default router;