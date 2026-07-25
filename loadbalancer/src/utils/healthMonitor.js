import axios from "axios";

import { EDGES } from "./edges.js";
import { edgeHealth } from "./healthStore.js";

export const startHealthMonitor = () => {
    setInterval(async () => {
        for (const edge of EDGES) {

            const previous = edgeHealth.get(edge.url);

            try {

                await axios.get(`${edge.url}/health`, {
                    timeout: 2000,
                });

                const isChanged = !previous.healthy;

                edgeHealth.set(edge.url, {
                    healthy: true,
                    lastChecked: Date.now(),
                    lastChanged: isChanged
                        ? Date.now()
                        : previous.lastChanged,
                });

                if (isChanged) {
                    console.log(`✅ ${edge.name} is BACK ONLINE`);
                }

            } catch {

                const isChanged = previous.healthy;

                edgeHealth.set(edge.url, {
                    healthy: false,
                    lastChecked: Date.now(),
                    lastChanged: isChanged
                        ? Date.now()
                        : previous.lastChanged,
                });

                if (isChanged) {
                    console.log(`❌ ${edge.name} went DOWN`);
                }

            }

        }

    }, 10000);

};