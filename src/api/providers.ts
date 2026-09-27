import { api } from "./client";

export const searchProviders = (params: { category?: string; lat?: number; lng?: number; radius?: number }) =>
  api.get("/providers", { params }).then((r) => r.data);

export const getProvider = (id: string) => api.get(`/providers/${id}`).then((r) => r.data);

export const getAvailability = (id: string, date: string) =>
  api.get(`/providers/${id}/availability`, { params: { date } }).then((r) => r.data);
