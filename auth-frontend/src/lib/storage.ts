import type { StoredUserProfile } from "../types/auth";

const TOKEN_KEY = "auth_token";
const USER_PROFILE_KEY = "auth_user_profile";

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_PROFILE_KEY);
}

export function saveUserProfile(profile: StoredUserProfile): void {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export function getUserProfile(): StoredUserProfile | null {
  const raw = localStorage.getItem(USER_PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredUserProfile;
  } catch {
    return null;
  }
}
