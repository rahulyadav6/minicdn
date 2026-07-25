import express from "express";
import { proxyRequest } from "../controllers/proxyController.js";

const router = express.Router();

router.get("/:projectId/:filename", proxyRequest);

export default router;