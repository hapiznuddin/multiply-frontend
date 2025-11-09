"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types/errorType";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      if (res.status === 201) {
        redirect("/login");
      }
      setMessage("Registrasi berhasil! Silakan login.");
    } catch (err) {
      if (err instanceof AxiosError) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        console.log(axiosError);
        setMessage(axiosError.response?.data?.message || "Login gagal");
      } else {
        setMessage("Login gagal");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Daftar
        </button>
        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}
