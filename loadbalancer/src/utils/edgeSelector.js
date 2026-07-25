const edges = [
    process.env.EDGE1,
    process.env.EDGE2,
];

let current = 0;
export const getEdgeOrder  = ()=>{
    const orderedEdges = [];
    for(let i=0; i<edges.length; i++){
        orderedEdges.push(edges[(current+i) % edges.length]);
    }
    current = (current + 1) % edges.length;
    return orderedEdges;
}