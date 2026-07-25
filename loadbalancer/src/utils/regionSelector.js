import { EDGES } from "./edges.js";
import { getEdgeOrder } from "./edgeSelector.js";

export const getRegionEdgeOrder = (preferredRegion) => {

    // No region provided → use Round Robin
    if (!preferredRegion) {
        return getEdgeOrder();
    }

    const preferredEdge = EDGES.find(
        edge => edge.region === preferredRegion
    );

    // Invalid region → use Round Robin
    if (!preferredEdge) {
        return getEdgeOrder();
    }

    const otherEdges = EDGES.filter(
        edge => edge.region !== preferredRegion
    );

    return [preferredEdge, ...otherEdges];
};