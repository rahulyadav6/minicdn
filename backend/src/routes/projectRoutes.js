import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createProject, getProjects, getProjectById  } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
export default router;