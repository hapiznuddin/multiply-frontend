"use server";
import { ApiErrorResponse } from "@/app/types/errorType";
import { cookies } from "next/headers";
import { fetchApi } from "@/lib/serverFetch";
import { formSchema } from "./schema";

export async function loginAction(
  _prevState: { error?: string; success?: string },
  formData: FormData
) {
  // ✅ Validasi input dengan Zod
  const result = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    const firstError = result.error.issues[0];
    return { error: firstError.message };
  }

  const { email, password } = result.data;

  const { res } = await fetchApi(`/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    const message =
      data?.message || "E-mail atau password yang anda masukkan salah";
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
  return { success: "Login berhasil" };
}
