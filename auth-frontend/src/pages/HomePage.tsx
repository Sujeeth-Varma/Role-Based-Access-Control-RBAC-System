import { Link } from "react-router";

export function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-zinc-950 text-zinc-100">
      <section className="w-full max-w-2xl border border-zinc-800 bg-zinc-900 rounded p-6 text-center">
        <h1 className="text-2xl font-semibold">Auth Assignment Frontend</h1>
        <p className="text-zinc-300 mt-3 text-sm">
          Minimal role-based authentication UI with JWT, protected routes, and
          role-specific dashboard content.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link
            className="border border-zinc-600 rounded px-3 py-2 hover:bg-zinc-800"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="border border-zinc-600 rounded px-3 py-2 hover:bg-zinc-800"
            to="/register"
          >
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}
