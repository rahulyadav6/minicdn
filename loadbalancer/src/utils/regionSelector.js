import { EDGES } from "./edges.js";
import { edgeHealth } from "./healthStore.js";
import { getEdgeOrder } from "./edgeSelector.js";

export const getRegionEdgeOrder = (preferredRegion) => {

    // Only keep healthy edges
    const healthyEdges = EDGES.filter(edge =>
        edgeHealth.get(edge.url)?.healthy
    );

    // If every edge is down, return an empty array
    if (healthyEdges.length === 0) {
        return [];
    }

    // No region → Round Robin among healthy edges
    if (!preferredRegion) {

        const orderedEdges = getEdgeOrder();

        return orderedEdges.filter(edge =>
            edgeHealth.get(edge.url)?.healthy
        );
    }

    // Find preferred healthy edge
    const preferredEdge = healthyEdges.find(
        edge => edge.region === preferredRegion
    );

    // Region doesn't exist or preferred edge is down
    if (!preferredEdge) {
        return healthyEdges;
    }

    const otherEdges = healthyEdges.filter(
        edge => edge.url !== preferredEdge.url
    );

    return [preferredEdge, ...otherEdges];
};