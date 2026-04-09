import { Navigate } from "react-router";
import type { PropsWithChildren } from "react";
import { isAuthenticated } from "../lib/auth";

export function PublicOnlyRoute({ children }: PropsWithChildren) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
