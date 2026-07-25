import express from "express";

import { invalidateCache } from "../controllers/cacheController.js";

const router = express.Router();

router.post("/invalidate", invalidateCache);

export default router;