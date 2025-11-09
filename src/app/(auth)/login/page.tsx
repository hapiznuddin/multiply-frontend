"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types/errorType";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/login", form);

      // ✅ simpan token di cookie (3 hari)
      document.cookie = `authToken=${data.token}; Path=/; Max-Age=${
        3600 * 24 * 3
      }`;

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        console.log(axiosError);
        setError(axiosError.response?.data?.message || "Login gagal");
      } else {
        setError("Login gagal");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-xl p-6 w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          name="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
