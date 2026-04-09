import axios from "axios";
import type {
  LoginFormValues,
  LoginResponse,
  ProtectedMessageResponse,
  RegisterFormValues,
} from "../types/auth";
import { getToken } from "./storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function login(payload: LoginFormValues): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/api/public/auth/signin",
    payload,
  );
  return data;
}

export async function register(
  payload: RegisterFormValues,
): Promise<LoginResponse> {
  const endpoint =
    payload.role === "ADMIN"
      ? "/api/public/auth/signup/admin"
      : "/api/public/auth/signup/user";

  const { data } = await api.post<LoginResponse>(endpoint, {
    username: payload.username,
    email: payload.email,
    password: payload.password,
  });

  return data;
}

export async function getUserContent(): Promise<ProtectedMessageResponse> {
  const { data } = await api.get<ProtectedMessageResponse>("/api/user");
  return data;
}

export async function getAdminContent(): Promise<ProtectedMessageResponse> {
  const { data } = await api.get<ProtectedMessageResponse>("/api/admin");
  return data;
}
