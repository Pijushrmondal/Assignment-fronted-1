export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    role: "ADMIN" | "EDITOR";
    email: string;
  };
}

