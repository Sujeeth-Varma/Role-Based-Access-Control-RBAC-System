import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AdminContentCard } from "../components/AdminContentCard";
import { UserContentCard } from "../components/UserContentCard";
import { getAdminContent, getUserContent } from "../lib/api";
import { getCurrentRole } from "../lib/auth";
import { clearToken } from "../lib/storage";

export function DashboardPage() {
  const navigate = useNavigate();
  const role = getCurrentRole();

  const userQuery = useQuery({
    queryKey: ["user-content"],
    queryFn: getUserContent,
    enabled: role === "USER",
    retry: false,
  });

  const adminQuery = useQuery({
    queryKey: ["admin-content"],
    queryFn: getAdminContent,
    enabled: role === "ADMIN",
    retry: false,
  });

  const onLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <main className="min-h-screen p-4 bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between border border-zinc-800 bg-zinc-900 rounded p-4">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm mt-1 text-zinc-300">
              Logged in as: {role ?? "Unknown"}
            </p>
          </div>
          <button
            className="border border-zinc-600 rounded px-3 py-2 hover:bg-zinc-800"
            onClick={onLogout}
          >
            Logout
          </button>
        </header>

        <section className="mt-4">
          {role === "USER" && userQuery.isPending && (
            <p className="text-sm text-zinc-300">Loading user content...</p>
          )}
          {role === "ADMIN" && adminQuery.isPending && (
            <p className="text-sm text-zinc-300">Loading admin content...</p>
          )}

          {role === "USER" && userQuery.error && (
            <p className="text-sm text-red-300">Failed to load user content.</p>
          )}
          {role === "ADMIN" && adminQuery.error && (
            <p className="text-sm text-red-300">
              Failed to load admin content.
            </p>
          )}

          {role === "USER" && userQuery.data && (
            <UserContentCard data={userQuery.data} />
          )}
          {role === "ADMIN" && adminQuery.data && (
            <AdminContentCard data={adminQuery.data} />
          )}
        </section>
      </div>
    </main>
  );
}
