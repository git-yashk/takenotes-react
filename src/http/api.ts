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

export interface Note {
    _id: string;
    title: string;
    content: string;
    bg_color: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
}

export async function register({ name, email, password }: { name: string, email: string, password: string }) {
    const response = await api.post("/api/users/register", { name, email, password });
    return response;
};

export async function login({ email, password }: { email: string, password: string }) {
    const response = await api.post("/api/users/login", { email, password });
    return response;
};

export async function createNote({ title, content, bg_color }: { title: string, content: string, bg_color?: string | undefined }): Promise<Note> {
    const response = await api.post<Note>("/api/notes/create", { title, content, bg_color });
    return response.data;
}

export async function getNotes(): Promise<Note[]> {
    const response = await api.get<Note[]>("/api/notes");
    return response.data;
}