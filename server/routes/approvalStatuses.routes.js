import { Router } from "express";
import ApprovalStatusesController from "../controllers/approvalStatuses.controller.js";

const router = new Router();

// Get Approval statuses
router.get("/approvalStatuses", ApprovalStatusesController.getApprovalStatuses);

export default router;
