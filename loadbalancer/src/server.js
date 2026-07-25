import "dotenv/config";
import { startHealthMonitor } from "./utils/healthMonitor.js";

import app from "./app.js";

const PORT = process.env.PORT || 5003;



app.listen(PORT, () => {
    console.log(`Load Balancer running on port ${PORT}`);
    startHealthMonitor();
});