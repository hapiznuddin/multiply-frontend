"use server";

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

export async function startGameAction(id: number) {
  const { res, user } = await fetchApi(`/rooms/${id}/start`, {
    method: "POST",
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memulai game" };
  }

  revalidateTag("rooms");
  const data = await res.json();
  return { data, user };
}

export async function finishRoomAction(id: number) {
  const { res, user } = await fetchApi(`/rooms/${id}/finish`, {
    method: "POST",
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal menyelesaikan game" };
  }

  revalidateTag("rooms");
  const data = await res.json();
  return { data, user };
}

export async function getRoomParticipantsAction(id: number) {
  const { res, user } = await fetchApi(`/rooms/${id}/game/leaderboard`, {
    method: "GET",
    next: { tags: ["rooms"] },
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data participant" };
  }

  const data = await res.json();
  return { data, user };
}
