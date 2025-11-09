import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false, // ❌ tidak perlu cookie-based session
  headers: {
    Accept: "application/json",
  },
});

// 🔁 interceptor untuk token dari cookie browser
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const match = document.cookie.match(/authToken=([^;]+)/);
    const token = match ? match[1] : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

