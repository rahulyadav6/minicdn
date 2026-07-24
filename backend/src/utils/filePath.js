import path from "path";

export const getFilePath = (relativePath) => {
    return path.join("storage", relativePath);
};