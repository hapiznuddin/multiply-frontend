"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./action";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: "",
  });

  // 🔁 redirect otomatis setelah login
  useEffect(() => {
    if (state.success) {
      router.replace("/dashboard");
    }
  }, [state.success, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <form
        action={formAction}
        className="bg-white shadow-md rounded-xl p-6 w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-60"
        >
          {isPending ? "Memproses..." : "Login"}
        </button>

        {state.error && (
          <p className="text-center text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
}
