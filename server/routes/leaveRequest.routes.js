import { Router } from "express";
import leaveRequestControllers from "../controllers/leaveRequest.controller.js";

const router = new Router();

// Create Leave Request
router.post("/leaveRequest", leaveRequestControllers.createLeaveRequest);

// Get Leave Requests
router.get("/leaveRequests", leaveRequestControllers.getLeaveRequests);

// Get Leave Request by Id
router.get("/leaveRequest/:id", leaveRequestControllers.getOneLeaveRequest);

// Update Leave Request
router.put("/leaveRequest/:id", leaveRequestControllers.updateLeaveRequest);

// Update Leave Request Status
router.put(
  "/leaveRequest/:id/status",
  leaveRequestControllers.updateLeaveRequestStatus
);

// Delete Leave Request
router.delete("/leaveRequest/:id", leaveRequestControllers.deleteLeaveRequest);

export default router;
