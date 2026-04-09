import type { Role } from "../types/auth";
import { getToken } from "./storage";

interface JwtPayload {
  roles?: string;
  exp?: number;
}

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;
    const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

export function getRoleFromToken(token: string): Role | null {
  const payload = parseJwtPayload(token);
  const roles = payload?.roles;

  if (!roles) return null;

  if (roles.includes("ROLE_ADMIN")) return "ADMIN";
  if (roles.includes("ROLE_USER")) return "USER";

  return null;
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwtPayload(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 < Date.now();
}

export function getCurrentRole(): Role | null {
  const token = getToken();
  if (!token || isTokenExpired(token)) return null;
  return getRoleFromToken(token);
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
}
