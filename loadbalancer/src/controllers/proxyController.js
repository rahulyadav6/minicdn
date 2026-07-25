import axios from "axios";
import { getEdgeOrder } from "../utils/edgeSelector.js";

export const proxyRequest = async (req, res) => {

    const { projectId, filename } = req.params;
    const edges = getEdgeOrder();
    for (const edge of edges) {
        try {
            console.log(`Trying ${edge}`);
            const response = await axios.get(
                `${edge}/cdn/${projectId}/${filename}`,
                {
                    responseType: "arraybuffer",
                    timeout: 3000,
                }
            );
            console.log(`✅ Served by ${edge}`);
            res.set(
                "Content-Type",
                response.headers["content-type"]
            );

            return res.send(response.data);
        } catch (error) {

            if (error.response) {
                console.log(
                    `❌ ${edge} responded with ${error.response.status}`
                );
                // If the file doesn't exist, don't try the next edge.
                if (error.response.status === 404) {
                    return res.status(404).json({
                        message: "File not found",
                    });
                }
            }else{
                console.log(`❌ ${edge} is unreachable`);
            }
        }
    }
    return res.status(503).json({
        message: "All Edge Servers are unavailable",
    });
};