import express from "express";
import { NewBatchEntries } from "../models/newBatchEntry.model.js";

const router = express.Router();

// for new batch entry module
// create new batch
router.post("/newBatchEntries", async (req, res) => {
  try {
    const { teacher, batch, time } = req.body;
    const data = await NewBatchEntries.create({
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
router.get("/newBatchEntries", async (req, res) => {
  try {
    const data = await NewBatchEntries.find();
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
router.get("/newBatchEntries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NewBatchEntries.findById(id);
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


export default router;