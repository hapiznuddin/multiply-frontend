"use server";

import { fetchApi } from "@/lib/serverFetch";

type ApiErrorResponse = {
  message?: string;
};

export async function getUserAction() {
  const { res, user } = await fetchApi("/rooms", {
    method: "GET",
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data pengguna" };
  }

  const data = await res.json();
  return { data, user };
}
