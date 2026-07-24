import express from "express";
import cdnRoutes from "./routes/cdnRoutes.js";

const app = express();

app.use("/cdn", cdnRoutes);

export default app;