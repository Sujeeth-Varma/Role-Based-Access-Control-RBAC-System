import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { register as registerUser } from "../lib/api";
import { saveToken, saveUserProfile } from "../lib/storage";
import type { RegisterFormValues } from "../types/auth";

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      role: "USER",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      saveToken(data.token);
      saveUserProfile({
        email: variables.email,
        role: variables.role,
      });
      navigate("/dashboard");
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-900 rounded p-5">
        <h1 className="text-xl font-semibold">Register</h1>

        <form
          className="mt-4 space-y-3"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Username</label>
            <input
              className="w-full border border-zinc-700 bg-zinc-950 rounded px-3 py-2 outline-none focus:border-zinc-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-sm mt-1 text-red-300">
                {errors.username.message}
              </p>
            )}
          </div>

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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm mt-1 text-red-300">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-300">Role</label>
            <select
              className="w-full border border-zinc-700 bg-zinc-950 rounded px-3 py-2 outline-none focus:border-zinc-500"
              {...register("role")}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-300">
              Registration failed. Please try again.
            </p>
          )}

          <button
            disabled={isPending}
            type="submit"
            className="border border-zinc-600 rounded px-3 py-2 hover:bg-zinc-800 disabled:opacity-60"
          >
            {isPending ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-4 text-zinc-300">
          Already have an account?{" "}
          <Link className="underline text-zinc-100" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
