import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "alegre-auth-token";

export { TOKEN_KEY };

api.interceptors.request.use((config) => {
  const t = sessionStorage.getItem(TOKEN_KEY);
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

export default api;
