import { Router } from "express";
import projectControllers from "../controllers/project.controllers.js";

const router = new Router();

// Create Project
router.post("/project", projectControllers.createProject);

// Get Projects
router.get("/projects", projectControllers.getProjects);

// Get Project by Id
router.get("/project/:id", projectControllers.getOneProject);

// Get Projects by Type
router.get(
  "/projects/type/:project_type_id",
  projectControllers.getProjectsByType
);

// Update Project
router.put("/project/:id", projectControllers.updateProject);

router.put("/project/:id/status", projectControllers.updateProjectStatus);

// Delete Project
router.delete("/project/:id", projectControllers.deleteProject);

export default router;
