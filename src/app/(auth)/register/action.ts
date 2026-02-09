"use server";
import { ApiErrorResponse } from "@/app/types/errorType";
import { serverFetch } from "@/lib/serverFetch";
import { formSchema } from "./schema";

export async function registerAction(
  _prevState: { error?: string; success?: string },
  formData: FormData
) {
  // ✅ Validasi input dengan Zod
  const result = formSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0];
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors, 
      error: error.message
    };
  }

  const  res  = await serverFetch(`/register`, {
    method: "POST",
    body: JSON.stringify({ ...result.data }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    const message =
      data?.message;
    return { error: message };
  }

  const data = await res.json();
  // console.log(data);
  return { success: "Successfully registered", data };
}
