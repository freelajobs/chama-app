import { api } from "./client";

export const getFavorites = () => api.get("/favorites").then((r) => r.data);
export const addFavorite = (provider_id: string) => api.post("/favorites", { provider_id }).then((r) => r.data);
export const removeFavorite = (providerId: string) => api.delete(`/favorites/${providerId}`);
