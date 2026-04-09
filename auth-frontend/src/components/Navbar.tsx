import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { isAuthenticated } from "../lib/auth";
import { clearToken, getUserProfile } from "../lib/storage";

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const authenticated = isAuthenticated();
  const profile = getUserProfile();
  const avatarLetter = (profile?.email?.trim()?.[0] ?? "U").toUpperCase();

  const onLogout = () => {
    clearToken();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900 text-zinc-100">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          AuthApp
        </Link>

        <button
          className="md:hidden border border-zinc-700 rounded px-2 py-1 text-sm"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav className="hidden md:flex items-center gap-3">
          {!authenticated && (
            <>
              <Link
                className="border border-zinc-700 rounded px-3 py-1.5 hover:bg-zinc-800"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="border border-zinc-700 rounded px-3 py-1.5 hover:bg-zinc-800"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {authenticated && (
            <div className="flex items-center gap-3">
              <Link
                className="border border-zinc-700 rounded px-3 py-1.5 hover:bg-zinc-800"
                to="/dashboard"
              >
                Dashboard
              </Link>
              <button
                className="border border-zinc-700 rounded px-3 py-1.5 hover:bg-zinc-800"
                onClick={onLogout}
              >
                Logout
              </button>
              <div className="relative group">
                <div className="size-9 rounded-full border border-zinc-600 bg-zinc-800 flex items-center justify-center text-sm font-semibold cursor-default">
                  {avatarLetter}
                </div>
                <div className="hidden group-hover:block absolute right-0 mt-2 w-52 border border-zinc-700 bg-zinc-900 rounded p-3 text-xs text-zinc-200">
                  <p className="break-all">
                    {profile?.email ?? "Unknown email"}
                  </p>
                  <p className="mt-1">Role: {profile?.role ?? "Unknown"}</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900 px-4 py-3 flex flex-col gap-2">
          {!authenticated && (
            <>
              <Link
                className="border border-zinc-700 rounded px-3 py-2"
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                className="border border-zinc-700 rounded px-3 py-2"
                to="/register"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          {authenticated && (
            <>
              <Link
                className="border border-zinc-700 rounded px-3 py-2"
                to="/dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="border border-zinc-700 rounded px-3 py-2 text-left"
                onClick={onLogout}
              >
                Logout
              </button>
              <div className="border border-zinc-700 rounded px-3 py-2 text-xs text-zinc-200">
                <p className="break-all">{profile?.email ?? "Unknown email"}</p>
                <p className="mt-1">Role: {profile?.role ?? "Unknown"}</p>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
