"use server";
import { ApiErrorResponse } from "@/app/types/errorType";
import { cookies } from "next/headers";
import {  serverFetch } from "@/lib/serverFetch";
import { formSchema } from "./schema";

export async function loginAction(
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
      error: error.message,
    };
  }

  const res  = await serverFetch(`/login`, {
    method: "POST",
    body: JSON.stringify({...result.data}),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    const message =
      data?.message || "E-mail or password is incorrect";
    return { error: message };
  }

  const data = await res.json();

  // ✅ simpan token di cookie (httpOnly agar aman)
  const cookieStore = await cookies();
  cookieStore.set("authNextToken", data.token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600 * 24 * 3, // 3 hari
    path: "/",
  });

  // ✅ kembalikan status sukses agar client bisa mengarahkan halaman
  return { success: "Successfully logged in", redirect: "/dashboard" };
}
