import express from "express";

import proxyRoutes from "./routes/proxyRoutes.js";

const app = express();

app.use("/cdn", proxyRoutes);

export default app;