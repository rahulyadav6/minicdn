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

