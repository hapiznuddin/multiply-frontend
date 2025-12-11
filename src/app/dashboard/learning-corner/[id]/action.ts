'use server';
import { ApiErrorResponse } from "@/app/types/errorType";
import { fetchApi } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

export async function getModuleIdAction(id: number) {
  const { res, user } = await fetchApi(`/learning-modules/${id}`, {
    method: "GET",
    next: { tags: ["learning-modules"] },
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

export async function deleteModuleAction(id: number) {
  const { res, user } = await fetchApi(`/learning-modules/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data pengguna" };
  }

  revalidateTag("learning-modules");
  const data = await res.json();
  return { data, user };
}