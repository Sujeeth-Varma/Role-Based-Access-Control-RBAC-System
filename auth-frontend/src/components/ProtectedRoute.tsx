import { Navigate } from "react-router";
import type { PropsWithChildren } from "react";
import { isAuthenticated } from "../lib/auth";

export function ProtectedRoute({ children }: PropsWithChildren) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
