import { api } from "./client";

export const login = (email: string, senha: string) =>
  api.post("/auth/login", { email, senha }).then((r) => r.data);

export const register = (payload: { nome: string; email: string; senha: string; tipo: string }) =>
  api.post("/auth/register", payload).then((r) => r.data);

export const logout = (refresh_token: string) => api.post("/auth/logout", { refresh_token });
