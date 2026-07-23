import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async(req,res) =>{
    try{
        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({
            message: err.message,
        });
    }
});

export default router;