import File from "../models/File.js";
import fs from "fs";
import Project from "../models/project.js";
import { invalidateCache } from "../utils/cacheInvalidator.js";
import { getFilePath } from "../utils/filePath.js";

export const uploadFile = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied",
            });
        }


        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        console.log(req.file);

        const existingFile = await File.findOne({
            project: project._id,
            originalName: req.file.originalname,
        }).sort({ createdAt: -1 });

        if (existingFile) {
            console.log("Existing file found");

            await invalidateCache(
                project._id.toString(),
                existingFile.filename
            );

            const oldFilePath = getFilePath(existingFile.relativePath);

            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
                console.log("🗑️ Old file deleted");
            }

            await existingFile.deleteOne();
            console.log("🗑️ Old database record deleted");
        }
        const uploadedFile = await File.create({
            filename: req.file.filename,

            originalName: req.file.originalname,

            mimeType: req.file.mimetype,

            size: req.file.size,

            relativePath: `${project._id}/${req.file.filename}`,

            project: project._id,

            uploadedBy: req.user._id,
        });
        return res.status(201).json(uploadedFile);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getProjectFiles = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }
        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        const files = await File.find({
            project: project._id,
        }).select("-__v -updatedAt -project -uploadedBy")
            .sort({
                createdAt: -1,
            });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}