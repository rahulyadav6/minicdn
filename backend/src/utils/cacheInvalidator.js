import axios from "axios";
import { EDGES } from "./edges.js";

export const invalidateCache = async (projectId, filename) => {

    for (const edge of EDGES) {

        try {

            await axios.post(
                `${edge}/cache/invalidate`,
                {
                    projectId,
                    filename,
                }
            );

            console.log(`✅ Cache invalidated on ${edge}`);

        } catch (error) {

            console.error(`❌ Failed to invalidate ${edge}`);
            console.error(error.message);

        }

    }

};