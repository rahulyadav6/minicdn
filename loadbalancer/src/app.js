import express from "express";
import healthRoutes from "./routes/healthRoutes.js";
import proxyRoutes from "./routes/proxyRoutes.js";

const app = express();

app.use("/cdn", proxyRoutes);
app.use("/health", healthRoutes);
export default app;