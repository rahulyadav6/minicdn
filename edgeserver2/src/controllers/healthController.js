export const healthCheck = (req, res) => {
    return res.json({
        status: "healthy",
        server: process.env.PORT,
        timestamp: Date.now(),
    });
};