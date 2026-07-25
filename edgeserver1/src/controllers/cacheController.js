import fs from "fs";
import path from "path";

import { getCachePath } from "../utils/cachePath.js";

export const invalidateCache = async(req, res) =>{
    try{
        const { projectId, filename } = req.body;
        const cachePath = getCachePath(projectId, filename);
        const absoluteCachePath = path.resolve(cachePath);
        if(fs.existsSync(absoluteCachePath)){
            fs.unlinkSync(absoluteCachePath);
            console.log(`🗑️ Deleted cache: ${filename}`);
        }else{
            console.log(`ℹ️ Cache not found: ${filename}`);
        }
        return res.json({
            success:true,
            message: "Cache invalidated",
        })
    }catch (error) {
    console.error("Invalidate Error:");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack,
    });
}
}