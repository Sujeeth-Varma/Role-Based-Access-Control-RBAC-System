export type Role = "USER" | "ADMIN";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
}

export interface ProtectedMessageResponse {
  message: string;
  role: Role;
}

export interface StoredUserProfile {
  email: string;
  role: Role;
}
