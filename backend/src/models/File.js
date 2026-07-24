import mongoose, { mongo } from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        filename:{
            type: String,
            required: true,
        },
        originalName:{
            type: String,
            required: true,
        },
        mimeType:{
            type: String,
            required: true,
        },
        size:{
            type: Number,
            required: true,
        },
        relativePath: {
            type: String,
            required: true,
        },
        project:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        uploadedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
    },
    {
        timestamps:true,
    }
);

const File = mongoose.model("File", fileSchema);

export default File