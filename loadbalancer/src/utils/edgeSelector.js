const edges = [
    process.env.EDGE1,
    process.env.EDGE2,
];

let current = 0;
export const getNextEdge = ()=>{
    const edge = edges[current];
    current = (current+1) % edges.length;
    return edge;
}