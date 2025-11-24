import { ApiErrorResponse } from "@/app/types/errorType";
import { fetchApi } from "@/lib/serverFetch";

export async function getMaterialIdAction(id: number) {
  const { res, user } = await fetchApi(`/material/${id}/questions`, {
    method: "GET",
    next: { tags: ["questions"] },
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
