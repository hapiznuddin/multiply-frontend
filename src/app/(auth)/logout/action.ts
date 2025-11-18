"use server";

import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";

export async function logoutAction() {
  const res = await serverFetch(`/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    (await cookies()).delete("authNextToken");
    return { success: true, redirect: "/"};
  }

  return { success: false };
}
