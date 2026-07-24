import express from "express";
import { uploadFile } from "../controllers/fileController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", protect, upload.single("file"), uploadFile);

export default router;