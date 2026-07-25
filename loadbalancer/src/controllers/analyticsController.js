import { metrics } from "../utils/metricsStore.js";

export const getAnalytics = (req, res) => {

    return res.json({
        totalRequests: metrics.totalRequests,
        edgeRequests: metrics.edgeRequests,
        failedRequests: metrics.failedRequests,
    });

};