"use server";

import { fetchApi, serverFetch } from "@/lib/serverFetch";
import { formSchemaRoom } from "./schema";
import { revalidateTag } from "next/cache";

type ApiErrorResponse = {
  message?: string;
};

export async function getUserAction() {
  const [rooms, quizCount, roomCount, materials, participantCount] =
    await Promise.all([
      fetchApi("/rooms", {
        method: "GET",
        next: { tags: ["rooms"] },
      }),
      fetchApi("/materials/count", {
        method: "GET",
        next: { tags: ["materials"] },
      }),
      fetchApi("/rooms/count", {
        method: "GET",
        next: { tags: ["rooms"] },
      }),
      fetchApi("/materials", {
        method: "GET",
        next: { tags: ["materials"] },
      }),
      fetchApi("/rooms/participants/count", {
        method: "GET",
        next: { tags: ["rooms"] },
      }),
    ]);

  if (
    !rooms.res.ok ||
    !quizCount.res.ok ||
    !materials.res.ok ||
    !participantCount.res.ok
  ) {
    const data = (await rooms.res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { error: data?.message || "Gagal memuat data pengguna" };
  }

  const roomsData = await rooms.res.json();
  const quizCountData = await quizCount.res.json();
  const roomCountData = await roomCount.res.json();
  const materialsData = await materials.res.json();
  const participantCountData = await participantCount.res.json();

  return {
    roomsData,
    quizCountData,
    roomCountData,
    materialsData,
    participantCountData,
  };
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

  const res = await serverFetch(`/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ ...result.data }),
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    const message = data?.message;
    return { error: message };
  }
  revalidateTag("rooms");
  revalidateTag("room-count");
  const data = await res.json();
  console.log(data);
  return { success: "Successfully created", data };
}
