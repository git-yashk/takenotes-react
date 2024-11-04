import useTokenStore from "@/zustand_store";
import axios from "axios";

const api = axios.create({
    // TODO: move this to .env
    baseURL: `http://localhost:3001`,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = useTokenStore.getState().token;
        if (!config.headers) {
            config.headers = {};
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function register({ name, email, password }: { name: string, email: string, password: string }) {
    const response = await api.post("/api/users/register", { name, email, password });
    return response;
};