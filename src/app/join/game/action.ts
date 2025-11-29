"use server";
import { ApiErrorResponse } from "@/app/types/errorType";
import { fetchApi } from "@/lib/serverFetch";
import { revalidateTag } from "next/cache";

export async function getGameQuestions(id: number) {
  const { res } = await fetchApi(`/rooms/${id}/game/questions`, {
    method: "GET",
    next: { tags: ["game"] },
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    const message = data?.message;
    return { error: message };
  }

  const data = await res.json();
  return { data };
}

export async function submitAnswer(
  roomId: number,
  payload: {
    guest_token: string;
    room_participant_id: number;
    question_id: number;
    answer: string | number;
  }
) {
  const { res } = await fetchApi(`/rooms/${roomId}/game/answers`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    return { error: data?.message || "Failed to submit answer" };
  }

  revalidateTag("game");
  revalidateTag("rooms");
  const data = await res.json();
  return { data };
}

export async function exitRoom(participantId: number) {
  const { res } = await fetchApi(`/rooms/participants/${participantId}/exit`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    return { error: data?.message || "Failed to exit room" };
  }

  revalidateTag("game");
  revalidateTag("rooms");
  const data = await res.json();
  return { data };
}
