"use server";

import { fetchApi, serverFetch } from "@/lib/serverFetch";
import { formSchemaMaterial } from "./schema";
import { revalidateTag } from "next/cache";

type ApiErrorResponse = {
  message?: string;
};

export async function getMaterialAction() {
  const { res, user } = await fetchApi("/materials", {
    method: "GET",
    next: { tags: ["materials"] },
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

export async function materialAction(
  _prevState: { error?: string; success?: string },
  formData: FormData
) {
  // ✅ Validasi input dengan Zod
  const result = formSchemaMaterial.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0];
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors, 
      error: error.message,
    };
  }

  const  res  = await serverFetch(`/materials`, {
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
  revalidateTag("materials");
  const data = await res.json();
  console.log(data);
  return { success: 'Successfully created', data };
}

