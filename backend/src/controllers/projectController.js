import Project from "../models/project.js"
import generateApiKey from "../utils/generateApiKey.js"

export const createProject = async (req,res)=>{
    try{
        const { name, description } = req.body;

        const project = await Project.create({
            name,
            description,
            owner: req.user._id,     
            apiKey: generateApiKey(),       
        });
        res.status(201).json(project);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getProjects = async(req,res)=>{
    try {
        const projects = await Project.find({
            owner: req.user._id,
        })
        .select("-apiKey -owner -updatedAt -__v")
        .sort({
            createdAt: -1,
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const getProjectById = async(req,res)=>{
    try {
        const project = await Project.findById(req.params.id).populate("owner", "name email");
        if(!project){
            return res.status(404).json({
                message: "Project not found",
            });
        }
        if (project.owner._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};