import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import userRoutes  from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
import cdnRoutes from "./routes/cdnRoutes.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/cdn", cdnRoutes);


app.get("/",(req,res) =>{
    res.send("Backend running");
})


export default app;