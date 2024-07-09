import { Router } from "express";
import SubdivisionController from "../controllers/subdivisions.controllers.js";

const router = new Router();

// Get Subdivisions
router.get("/subdivisions", SubdivisionController.getSubdivisions);

export default router;
