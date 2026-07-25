import express from "express";
import cdnRoutes from "./routes/cdnRoutes.js";
import cacheRoutes from "./routes/cacheRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";


const app = express();
app.use(express.json());

app.use("/cdn", cdnRoutes);
app.use("/cache", cacheRoutes);
app.use("/health", healthRoutes);

export default app;