import express from "express";
import { handleRequest } from "../controllers/cdnController.js";

const router = express.Router();

router.get("/:projectId/:filename", handleRequest);

export default router;