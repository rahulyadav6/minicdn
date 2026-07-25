import express from "express";
import cdnRoutes from "./routes/cdnRoutes.js";
import cacheRoutes from "./routes/cacheRoutes.js";

const app = express();
app.use(express.json());

app.use("/cdn", cdnRoutes);
app.use("/cache", cacheRoutes);

export default app;