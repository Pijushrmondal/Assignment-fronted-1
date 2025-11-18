import axios from "axios";
import { getToken } from "../utils/storage";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://assignment-backend-1-production.up.railway.app";

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
