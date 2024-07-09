import { Router } from "express";
import AbsenceReasonsController from "../controllers/absenceReason.controller.js";

const router = new Router();

// Get AbsenceReasons
router.get("/absenceReasons", AbsenceReasonsController.getAbsenceReasons);

export default router;
