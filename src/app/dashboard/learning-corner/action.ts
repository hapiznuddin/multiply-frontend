"use server";
import { fetchApi, serverFetch } from "@/lib/serverFetch";
import { formSchemaModule } from "./schema";
import { ApiErrorResponse } from "@/app/types/errorType";
import { revalidateTag } from "next/cache";

export async function getModuleAction() {
  const { res, user } = await fetchApi("/learning-modules", {
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

export async function moduleAction(
  _prevState: { error?: string; success?: string },
  formData: FormData
) {
  // ✅ Validasi input dengan Zod
  const result = formSchemaModule.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0];
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors,
      error: error.message,
    };
  }

  const res = await serverFetch(`/learning-modules`, {
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
  revalidateTag("learning-modules");
  const data = await res.json();
  // console.log(data);
  return { success: "Successfully created", data };
}

export async function updateModuleAction(
  id: number,
  _prevState: {
    error?: string;
    success?: string;
    fieldErrors?: { [key: string]: string[] };
  },
  formData: FormData
) {
  const result = formSchemaModule.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0];
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors,
      error: error.message,
    };
  }

  const res = await serverFetch(`/learning-modules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(result.data),
  });

  if (!res.ok) {
    const data = (await res
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    return { error: data?.message || "Failed to update module" };
  }

  revalidateTag("learning-modules");
  const data = await res.json();
  return { success: "Successfully updated", data };
}
