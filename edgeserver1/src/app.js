import express from "express";
import cdnRoutes from "./routes/cdnRoutes.js";
import cacheRoutes from "./routes/cacheRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();
app.use(express.json());

app.use("/cdn", cdnRoutes);
app.use("/cache", cacheRoutes);
app.use("/health", healthRoutes);
app.use("/analytics", analyticsRoutes);
export default app;