import { api } from "./client";

// Proxy no backend (POST /geocode/reverse) — mantém a chave do Google fora do app.
export const reverseGeocode = (lat: number, lng: number) =>
  api.post("/geocode/reverse", { lat, lng }).then((r) => r.data);
