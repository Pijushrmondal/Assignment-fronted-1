import api from "./index";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", credentials);
  return res.data;
};

