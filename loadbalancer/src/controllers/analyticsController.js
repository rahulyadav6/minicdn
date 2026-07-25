import axios from "axios";
import { metrics } from "../utils/metricsStore.js";
import { EDGES } from "../utils/edges.js";

export const getAnalytics = async (req, res) => {

    let totalCacheHits = 0;
    let totalCacheMisses = 0;
    let totalOriginFetches = 0;

    for (const edge of EDGES) {
        try {
            const response = await axios.get(
                `${edge.url}/analytics`,
                {
                    timeout: 2000,
                }
            );
            totalCacheHits += response.data.cacheHits;
            totalCacheMisses += response.data.cacheMisses;
            totalOriginFetches += response.data.originFetches;
        }catch(error){
            console.log(
                `Unable to fetch analytics from ${edge.name}`
            );
        }
    }

    const totalCacheRequests =
        totalCacheHits + totalCacheMisses;

    const hitRate =
        totalCacheRequests === 0
            ? "0%"
            : (
                  (totalCacheHits / totalCacheRequests) *
                  100
              ).toFixed(2) + "%";

    return res.json({
        totalRequests: metrics.totalRequests,
        edgeRequests: metrics.edgeRequests,
        failedRequests: metrics.failedRequests,

        cacheHits: totalCacheHits,
        cacheMisses: totalCacheMisses,
        originFetches: totalOriginFetches,
        hitRate,
    });

};