import { Router } from "express";
import approvalRequestController from "../controllers/approvalRequest.controller.js";

const router = new Router();

// Create Approval Request
router.post(
  "/approvalRequest",
  approvalRequestController.createApprovalRequest
);

// Get Approval Requests
router.get("/approvalRequests", approvalRequestController.getApprovalRequests);

// Get Approval Request by Id
router.get(
  "/approvalRequest/:id",
  approvalRequestController.getOneApprovalRequest
);

// Update Approval Request
router.put(
  "/approvalRequest/:id",
  approvalRequestController.updateApprovalRequest
);

// Approve Approval Request
router.put(
  "/approvalRequest/:id/approve",
  approvalRequestController.approveApprovalRequest
);

// Reject Approval Request
router.put(
  "/approvalRequest/:id/reject",
  approvalRequestController.rejectApprovalRequest
);

// Delete Approval Request by leave request id
router.delete(
  "/approvalRequest/:leave_request_id",
  approvalRequestController.deleteApprovalRequest
);

export default router;
