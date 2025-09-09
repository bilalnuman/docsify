import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getCookie } from "../util/cookies";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
<<<<<<< HEAD
=======
        "Content-Type": "application/json",
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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
<<<<<<< HEAD
        } else if (error.request) {
            console.error("Network Error: No response from server", error.request);
        } else {
=======
            if (error.response.status === 401) {
                // Optionally redirect to login or refresh token
                // window.location.href = "/login";
            }
        } else if (error.request) {
            // Request made but no response received
            console.error("Network Error: No response from server", error.request);
        } else {
            // Something else happened
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
            console.error("Unexpected Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
