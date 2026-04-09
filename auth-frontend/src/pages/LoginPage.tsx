import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { getRoleFromToken } from "../lib/auth";
import { login } from "../lib/api";
import { saveToken, saveUserProfile } from "../lib/storage";
import type { LoginFormValues } from "../types/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      saveToken(data.token);
      const role = getRoleFromToken(data.token);
      if (role) {
        saveUserProfile({
          email: variables.email,
          role,
        });
      }
      navigate("/dashboard");
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-900 rounded p-5">
        <h1 className="text-xl font-semibold">Login</h1>

        <form
          className="mt-4 space-y-3"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Email</label>
            <input
              type="email"
              className="w-full border border-zinc-700 bg-zinc-950 rounded px-3 py-2 outline-none focus:border-zinc-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm mt-1 text-red-300">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-300">Password</label>
            <input
              type="password"
              className="w-full border border-zinc-700 bg-zinc-950 rounded px-3 py-2 outline-none focus:border-zinc-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm mt-1 text-red-300">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-300">
              Invalid credentials. Please try again.
            </p>
          )}

          <button
            disabled={isPending}
            type="submit"
            className="border border-zinc-600 rounded px-3 py-2 hover:bg-zinc-800 disabled:opacity-60"
          >
            {isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4 text-zinc-300">
          Don&apos;t have an account?{" "}
          <Link className="underline text-zinc-100" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
