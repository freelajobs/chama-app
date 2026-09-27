import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Aponte para a API criada em /chama-api (seção "Como rodar" do README dela)
export const API_URL = "http://localhost:3333/api/v1";

export const api = axios.create({ baseURL: API_URL });

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Em 401, tenta renovar o access_token via refresh_token uma única vez (evita loop).
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refresh_token = await SecureStore.getItemAsync("refresh_token");
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refresh_token });
          await SecureStore.setItemAsync("access_token", data.access_token);
          await SecureStore.setItemAsync("refresh_token", data.refresh_token);
          pendingQueue.forEach((fn) => fn());
          pendingQueue = [];
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise((resolve) => {
        pendingQueue.push(() => resolve(api(original)));
      });
    }
    return Promise.reject(error);
  }
);
