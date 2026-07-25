import axios from "axios";
import { getEdgeOrder  } from "../utils/edgeSelector.js";

export const proxyRequest = async(req,res)=>{

    const {projectId, filename } = req.params;
    const edges = getEdgeOrder();
    for(const edge of edges){
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
            console.log(`❌ ${edge} unavailable`);
        }
    }
     return res.status(503).json({
        message: "All Edge Servers are unavailable",
    });
};