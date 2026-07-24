import path from "path";

export const  getCachePath = (projectId, filename)=>{
    return path.join("cache", projectId, filename);
}