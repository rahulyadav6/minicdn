import axios from "axios";
import { getRegionEdgeOrder } from "../utils/regionSelector.js";
import { metrics } from "../utils/metricsStore.js";

export const proxyRequest = async (req, res) => {

    metrics.totalRequests++;

    const { projectId, filename } = req.params;
    const preferredRegion = req.header("X-Region")?.toLowerCase();

    console.log("Preferred Region:", preferredRegion || "Not provided");
    const edges = getRegionEdgeOrder(preferredRegion);
    if(edges.length === 0){
        metrics.failedRequests++;
        return res.status(503).json({
            message: "No healthy edge servers available",
        });
    }

    for (const edge of edges) {

        try {

            console.log(`Trying ${edge.name}`);

            const response = await axios.get(
                `${edge.url}/cdn/${projectId}/${filename}`,
                {
                    responseType: "arraybuffer",
                    timeout: 3000,
                }
            );

            console.log(`✅ Served by ${edge.name}`);

            res.set(
                "Content-Type",
                response.headers["content-type"]
            );

            metrics.edgeRequests[edge.region]++;

            return res.send(response.data);

        } catch (error) {
            if (error.response) {
                console.log(
                    `❌ ${edge.name} responded with ${error.response.status}`
                );
                if (error.response.status === 404) {
                    return res.status(404).json({
                        message: "File not found",
                    });
                }
            } else {
                console.log(`❌ ${edge.name} is unreachable`);
            }

        }

    }
    return res.status(503).json({
        message: "All Edge Servers are unavailable",
    });

};