import { Router } from "express";
import ProjectTypeController from "../controllers/projectType.controllers.js";

const router = new Router();

// Get Project types
router.get("/projectTypes", ProjectTypeController.getProjectTypes);

export default router;
