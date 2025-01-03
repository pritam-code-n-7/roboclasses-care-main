import express from "express";
import { NormalClass } from "../models/normalClassAppointments.model.js";
const router = express.Router();

// route handlers for Normal Class appointments
// Create appointments
router.post("/appointments/normalClass", async (req, res) => {
  try {
    const { teacher, batch, time, items } = req.body;
    const data = await NormalClass.create({ teacher, batch, time, items });

    console.log(data);
    res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
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
