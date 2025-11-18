import api from "./index";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "../types/auth";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", credentials);
  return res.data;
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const res = await api.post<SignupResponse>("/auth/signup", data);
  return res.data;
};

