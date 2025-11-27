"use server";

import { fetchApi, serverFetch } from "@/lib/serverFetch";
import { formSchemaRoom } from "./schema";
import { revalidateTag } from "next/cache";

type ApiErrorResponse = {
  message?: string;
};

export async function getUserAction() {
  const [rooms, quizCount, roomCount, materials] = await Promise.all([
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
    fetchApi("/materials", {
      method: "GET",
      next: { tags: ["materials"] },
    }),
  ]);

  if (!rooms.res.ok || !quizCount.res.ok || !roomCount.res.ok || !materials.res.ok) {
    const data = (await rooms.res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data pengguna" };
  }

  const roomsData = await rooms.res.json();
  const quizCountData = await quizCount.res.json();
  const roomCountData = await roomCount.res.json();
  const materialsData = await materials.res.json();
  return { roomsData, quizCountData, roomCountData, materialsData };
}

export async function createRoomAction(
 _prevState: { error?: string; success?: string },
  formData: FormData
) {
  // ✅ Validasi input dengan Zod
  const result = formSchemaRoom.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0];
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors, 
      error: error.message,
    };
  }

  const  res  = await serverFetch(`/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ ...result.data }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    const message =
      data?.message;
    return { error: message };
  }
  revalidateTag("rooms");
  revalidateTag("room-count");
  const data = await res.json();
  console.log(data);
  return { success: 'Successfully created', data };
}
