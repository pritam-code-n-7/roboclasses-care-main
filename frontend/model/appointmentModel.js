import { model, models, Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    date: {
      required: true,
      type: Date,
    },
    userName: {
      required: true,
      type: String,
    },
    destination: {
      required: true,
      type: String,
    },
    course: {
      required: true,
      type: String,
    },
    time: {
      required: true,
      type: String,
    },
  
  },
  {
    timestamps: true,
  }
);

export const Appointment =
  models.Appointment ?? model("Appointment", appointmentSchema);
