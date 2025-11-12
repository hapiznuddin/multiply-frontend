"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "./action";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerAction, {
    error: "",
  });

  // 🔁 redirect otomatis setelah login
  useEffect(() => {
    if (state.success) {
      router.replace("/login");
    }
  }, [state.success, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      <form
        action={formAction}
        className="bg-white shadow-lg rounded-xl p-6 w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-60"
        >
          {isPending ? "Memproses..." : "Daftar Akun"}
        </button>

        {state.error && (
          <p className="text-center text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
}
