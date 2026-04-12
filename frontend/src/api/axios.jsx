import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
    headers: {
    "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("[REQUEST]", config.method.toUpperCase(), config.url);
        console.log("[DATA]", config.data);
        console.log("[HEADERS]", config.headers);

        return config;
    },
    (error) => {
        console.error("[REQUEST ERROR]", error);  
        return Promise.reject(error); 
    }
)

api.interceptors.response.use(
    (response) => {
        console.log("[RESPONSE]", response.status, response.config.url);
        console.log("[DATA]", response.data);

        return response;
    },
    async (error) => {

        if (error.response?.status === 403) {
            console.error("[403] Forbidden.");
        }

        if (error.response?.status === 404) {
            console.error("[404] Not found.");
        }

        if (error.response?.status === 500) {
            console.error("[500] Server error!");
        }

        if (!error.response) {
            console.error("[NETWORK ERROR] Server not connected or internet error.");
        }

        if (error.code === "ECONNABORTED") {
            console.error("[TIMEOUT] Server do not respond.");
        }

        console.error("[ERROR]", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            url: error.config?.url,
        });

        return Promise.reject(error);  
    }
)

export default api;