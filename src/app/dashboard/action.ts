"use server";

import { fetchApi } from "@/lib/serverFetch";

type ApiErrorResponse = {
  message?: string;
};

export async function getUserAction() {
  const [rooms, quizCount, roomCount] = await Promise.all([
    fetchApi("/rooms", {
      method: "GET",
      next: { tags: ["rooms"] },
    }),
    fetchApi("/materials/count", {
      method: "GET",
      next: { tags: ["quiz-count"] },
    }),
    fetchApi("/rooms/count", {
      method: "GET",
      next: { tags: ["room-count"] },
    }),
  ]);

  if (!rooms.res.ok || !quizCount.res.ok || !roomCount.res.ok) {
    const data = (await rooms.res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data pengguna" };
  }

  const roomsData = await rooms.res.json();
  const quizCountData = await quizCount.res.json();
  const roomCountData = await roomCount.res.json();
  return { roomsData, quizCountData, roomCountData };
}
