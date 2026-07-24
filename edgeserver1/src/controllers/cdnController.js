export const handleRequest = async (req, res) => {

    const { projectId, filename } = req.params;

    console.log("Request reached Edge Server");
    console.log("Project:", projectId);
    console.log("Filename:", filename);

    res.json({
        message: "Edge Server received request",
        projectId,
        filename,
    });
};