import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const projectId = req.params.projectId;
        const uploadpath = path.join(
            "storage",projectId
        );
        fs.mkdirSync(uploadpath, {
            recursive: true,
        });
        cb(null, uploadpath);
    },
    filename: (req, file, cb)=>{
        const uniqueName = 
            Date.now() + "-" + file.originalname;
        
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
});

export default upload;