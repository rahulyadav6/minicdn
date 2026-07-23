import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import userRoutes  from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);


app.get("/",(req,res) =>{
    res.send("Backend running");
})


export default app;