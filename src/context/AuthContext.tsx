import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as AuthApi from "../api/auth";

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((token) => {
      setIsAuthenticated(!!token);
      setLoading(false);
    });
  }, []);

  async function signIn(email: string, senha: string) {
    const { access_token, refresh_token } = await AuthApi.login(email, senha);
    await SecureStore.setItemAsync("access_token", access_token);
    await SecureStore.setItemAsync("refresh_token", refresh_token);
    setIsAuthenticated(true);
  }

  async function signOut() {
    const refresh_token = await SecureStore.getItemAsync("refresh_token");
    if (refresh_token) await AuthApi.logout(refresh_token).catch(() => {});
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
