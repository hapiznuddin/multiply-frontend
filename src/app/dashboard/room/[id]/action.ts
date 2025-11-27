'use server';

import { fetchApi } from "@/lib/serverFetch";
import { ApiErrorResponse } from "@/app/types/errorType";
import { revalidateTag } from "next/cache";

export default async function getRoomAction(id: number) {
  const { res, user } = await fetchApi(`/rooms/${id}/questions`, {
    method: "GET",
    next: { tags: ["rooms"] },
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data room" };
  }

  const data = await res.json();
  return { data, user };
}

export async function deleteRoomAction(id: number) {
  const { res, user } = await fetchApi(`/rooms/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data pengguna" };
  }

  revalidateTag("rooms");
  const data = await res.json();
  return { data, user };
}