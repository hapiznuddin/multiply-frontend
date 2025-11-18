"use server";

// import { UserType } from "@/app/types/userType";
import { cookies } from "next/headers";

export async function serverFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error(
      "Konfigurasi API URL tidak ditemukan (NEXT_PUBLIC_API_URL)"
    );
  }
  const token = (await cookies()).get("authNextToken")?.value;

  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const isAbsolute = /^https?:\/\//i.test(path);
  const targetUrl = isAbsolute ? path : `${baseUrl}${path}`;

  return fetch(targetUrl, {
    ...init,
    headers,
    cache: "no-store",
  });
}

// export async function fetchUser<T = UserType>(): Promise<T | null> {
//   const res = await serverFetch("/get-user", { method: "GET" });
//   if (!res.ok) return null as T | null;
//   return (await res.json()) as T;
// }

// export async function fetchApi<TUser = UserType>(
//   path: string,
//   init?: RequestInit
// ): Promise<{ res: Response; user: TUser | null }> {
//   const [res, user] = await Promise.all([
//     serverFetch(path, init),
//     fetchUser<TUser>(),
//   ]);
//   return { res, user };
// }
