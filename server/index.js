import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoute from "./routes/employee.routes.js";
import projectRoute from "./routes/projects.routes.js";
import leaveRequestRoute from "./routes/leaveRequest.routes.js";
import approvalRequestRoute from "./routes/approvalRequest.routes.js";
import positionRoute from "./routes/positions.routes.js";
import subdivisionRoute from "./routes/subdivision.routes.js";
import projectTypeRoute from "./routes/projectTypes.routes.js";
import absenceReasonRoute from "./routes/absenceReason.routes.js";
import approvalStatusesRoute from "./routes/approvalStatuses.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", employeeRoute);
app.use("/api", projectRoute);
app.use("/api", leaveRequestRoute);
app.use("/api", approvalRequestRoute);
app.use("/api", absenceReasonRoute);
app.use("/api", approvalStatusesRoute);
app.use("/api", positionRoute);
app.use("/api", subdivisionRoute);
app.use("/api", projectTypeRoute);

async function start() {
  try {
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`App started at PORT:${process.env.SERVER_PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();
