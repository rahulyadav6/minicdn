import fs from "fs";
import path from "path";
import File from "../models/File.js";
import { getFilePath } from "../utils/filePath.js";

export const serveFile = async(req, res)=>{
    try{
        const { projectId, filename } = req.params;

        const file = await File.findOne({
            project: projectId,
            filename,
        });
        if(!file){
            return res.status(404).json({
                message: "File not found",
            });
        }
        const fullPath = getFilePath(file.relativePath);

        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({
                message: "Physical file not found",
            });
        }
        res.set({
            "Cache-Control": "public, max-age=3600",
        })
        return res
        .type(file.mimeType)
        .sendFile(path.resolve(fullPath));
        
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
}