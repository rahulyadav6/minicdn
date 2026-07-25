import { EDGES } from "./edges.js";

export const edgeHealth = new Map();

EDGES.forEach((edge) => {
    edgeHealth.set(edge.url, {
        healthy: true,
        lastChecked: null,
        lastChanged: Date.now(),
    });
});