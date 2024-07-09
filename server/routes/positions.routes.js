import { Router } from "express";
import PositionController from "../controllers/positions.controllers.js";

const router = new Router();

// Get Positions
router.get("/positions", PositionController.getPositions);

export default router;
