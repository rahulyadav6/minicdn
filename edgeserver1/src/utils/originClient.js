import axios from "axios";

const originClient = axios.create({
    baseURL: process.env.ORIGIN_URL,
});

export default originClient;