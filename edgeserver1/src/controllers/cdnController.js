import axios from "axios";

export const handleRequest = async (req, res) => {
    try {

        const { projectId, filename } = req.params;

        console.log("Edge received request");
        console.log("Origin URL:", process.env.ORIGIN_URL);

        const response = await axios.get(
            `${process.env.ORIGIN_URL}/cdn/${projectId}/${filename}`,
            {
                responseType: "arraybuffer",
            }
        );

        console.log("Fetched from Origin");

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