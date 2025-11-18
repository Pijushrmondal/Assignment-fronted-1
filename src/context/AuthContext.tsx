import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getToken, setToken, clearToken } from "../utils/storage";

interface User {
  id: string;
  email: string;
  role: "ADMIN" | "EDITOR";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getToken());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const t = getToken();
    if (!t) return;
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser) setUser(storedUser);
    } catch {}
  }, []);

  const login = (tok: string, usr: User) => {
    setToken(tok);
    localStorage.setItem("user", JSON.stringify(usr));
    setTokenState(tok);
    setUser(usr);
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem("user");
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
