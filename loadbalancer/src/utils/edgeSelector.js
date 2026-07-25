import { EDGES } from "./edges.js";

let current = 0;

export const getEdgeOrder = () => {
    const orderedEdges = [];

    for (let i = 0; i < EDGES.length; i++) {
        orderedEdges.push(
            EDGES[(current + i) % EDGES.length]
        );
    }

    current = (current + 1) % EDGES.length;

    return orderedEdges;
};