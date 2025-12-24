import { ApiErrorResponse } from "@/app/types/errorType";
import { fetchApi } from "@/lib/serverFetch";

export async function getLeaderboard(id: number) {
  const { res } = await fetchApi(`/rooms/${id}/game/leaderboard`, {
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

export async function getParticipantAchievements(participantId: number) {
  const { res } = await fetchApi(
    `/rooms/participants/${participantId}/achievements`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    return { error: "Failed to fetch achievements" };
  }

  const data = await res.json();
  return { data };
}
