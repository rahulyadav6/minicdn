import fs from "fs";
import path from "path";
import { getCachePath } from "../utils/cachePath.js";
import axios from "axios";

export const handleRequest = async (req, res) => {
    try {

        const { projectId, filename } = req.params;

        console.log("Edge received request");
        const cachePath = getCachePath(projectId, filename);
        const absoluteCachePath = path.resolve(cachePath);

        if (fs.existsSync(absoluteCachePath)) {

            console.log("✅ Cache HIT");

            return res.sendFile(absoluteCachePath);
        }

        console.log("❌ Cache MISS");

        console.log("Origin URL:", process.env.ORIGIN_URL);

        const response = await axios.get(
            `${process.env.ORIGIN_URL}/cdn/${projectId}/${filename}`,
            {
                responseType: "arraybuffer",
            }
        );

        console.log("Fetched from Origin");

        const cacheDir = path.dirname(absoluteCachePath);
        fs.mkdirSync(cacheDir, { recursive: true });
        fs.writeFileSync(absoluteCachePath, response.data);
        console.log("💾 File cached");

        res.set(
            "Content-Type",
            response.headers["content-type"]
        );

        return res.send(response.data);

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            message: "Failed to fetch from Origin",
        });

    }
};