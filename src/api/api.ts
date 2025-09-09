import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getCookie } from "../util/cookies";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});


api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getCookie("access_token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error("API Error:", {
                url: error.config?.url,
                status: error.response.status,
                data: error.response.data,
            });
        } else if (error.request) {
            console.error("Network Error: No response from server", error.request);
        } else {
            console.error("Unexpected Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
