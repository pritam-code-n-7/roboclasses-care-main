import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { dbConnect } from "./config/db.js";
import { Appointment } from "./models/appointment.model.js";
import { Attendance } from "./models/attendance.model.js";
// import scheduleReminders from "./jobs/scheduler.js";

dotenv.config();
const app = express();

// connect to db
dbConnect();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// create appointments
app.post("/api/appointments", async (req, res) => {
  try {
    const { date, userName, destination, course, teacher, time, items } =
      req.body;
    const newAppointment = {
      date,
      userName,
      destination,
      course,
      teacher,
      time,
      items,
    };
    console.log(newAppointment);

    const createAppointments = await Appointment.create({
      date,
      userName,
      destination,
      course,
      teacher,
      time,
      items,
    });
    // await scheduleReminders(newAppointment)
    console.log(createAppointments);
    return res.status(201).json({
      success: true,
      message: "appointment create successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const data = await Appointment.find();
    // console.log(data);

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get single appointment
app.get("/api/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findById(id);
    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// edit appointment
app.put("/api/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, userName, destination, time, items, course, teacher } =
      req.body;
    const data = await Appointment.findByIdAndUpdate(
      id,
      { date, userName, destination, time, items, course, teacher },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Your appointment is now rescheduled successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// delete appointment
app.delete("/api/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findByIdAndDelete(id);
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Your appointment is now deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// update appointment status
app.patch("/api/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    console.log(data);

    res.status(200).json({
      success: true,
      message: "Your appointment status updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// for attendance module
// create new batch
app.post("/api/attendances", async (req, res) => {
  try {
    const { teacher, batch, time } = req.body;
    const data = await Attendance.create({
      teacher,
      batch,
      time,
    });

    console.log(data);

    res.status(201).json({
      success: true,
      message: "New batch successfully created.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get batches
app.get("/api/attendances", async (req, res) => {
  try {
    const data = await Attendance.find();
    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get a single batch
app.get("/api/attendances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Attendance.findById(id);
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

// listning on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
