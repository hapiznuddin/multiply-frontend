"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import type { UserType } from "../types/userType";

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    api
      .get("/get-user")
      .then((res) => setUser(res.data))
      .catch(() => router.push("/login"));
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {user ? (
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-2">
            Selamat datang, {user.name} 👋
          </h1>
          <button
            onClick={async () => {
              await api.post("/logout");
              router.push("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Memuat data pengguna...</p>
      )}
    </div>
  );
}
