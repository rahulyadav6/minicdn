import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createProject, getProjects, getProjectById, deleteProject  } from "../controllers/projectController.js";
import fileRoutes from "./fileRoutes.js";
const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.delete("/:id", protect, deleteProject);
router.use("/:projectId/files", fileRoutes);
export default router;