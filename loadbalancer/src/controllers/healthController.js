import { EDGES } from "../utils/edges.js";
import { edgeHealth } from "../utils/healthStore.js";

export const getHealthStatus = (req, res) => {

    const health = EDGES.map((edge) => {

        const status = edgeHealth.get(edge.url);

        return {
            name: edge.name,
            region: edge.region,
            url: edge.url,
            healthy: status?.healthy ?? false,
            lastChecked: status?.lastChecked
                ? new Date(status.lastChecked)
                : null,
            lastChanged: status?.lastChanged
                ? new Date(status.lastChanged)
                : null,
        };

    });

    return res.json({
        edges: health,
    });

};