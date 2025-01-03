import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { dbConnect } from "./config/db.js";

import appointmentsRoute from "./routes/appointmentsRoute.js"
import newBatchEntryRoute from "./routes/newBatchEntryRoute.js"
import attendancesRoute from "./routes/attendancesRoute.js"
import normalClassAppointmentsRoute from "./routes/normalClassAppointmentsRoute.js"

dotenv.config();
const app = express();

// connect to db
dbConnect();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// routes
app.use('/api/v1',appointmentsRoute)
app.use('/api/v1', newBatchEntryRoute)
app.use('/api/v1',attendancesRoute)
app.use('/api/v1',normalClassAppointmentsRoute)

// listning on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
