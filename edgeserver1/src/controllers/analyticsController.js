import { metrics } from "../utils/metricsStore.js";

export const getAnalytics = (req, res) => {

    const hitRate =
        metrics.cacheHits + metrics.cacheMisses === 0
            ? "0%"
            : (
                  (metrics.cacheHits /
                      (metrics.cacheHits + metrics.cacheMisses)) *
                  100
              ).toFixed(2) + "%";

    res.json({
        cacheHits: metrics.cacheHits,
        cacheMisses: metrics.cacheMisses,
        originFetches: metrics.originFetches,
        hitRate,
    });

};