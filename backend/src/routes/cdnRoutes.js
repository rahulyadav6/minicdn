import express from "express";
import { serveFile } from "../controllers/cdnController.js";
const router = express.Router();

router.get("/:projectId/:filename", serveFile);

export default router;