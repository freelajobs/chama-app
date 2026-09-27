import { io, Socket } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../api/client";

let socket: Socket | null = null;

/** Conecta (ou reaproveita) o socket autenticado do usuário logado. */
export async function getSocket(): Promise<Socket> {
  if (socket?.connected) return socket;
  const token = await SecureStore.getItemAsync("access_token");
  const baseUrl = API_URL.replace("/api/v1", "");
  socket = io(baseUrl, { auth: { token }, transports: ["websocket"] });
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
