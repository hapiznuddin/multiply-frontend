'use server';
import { serverFetch } from "@/lib/serverFetch";
import { formSchemaRoomJoin } from "./schema";
import { ApiErrorResponse } from "../types/errorType";
import { revalidateTag } from "next/cache";

export async function createRoomJoinAction(
 _prevState: { error?: string; success?: string },
  formData: FormData
) {
    const result = formSchemaRoomJoin.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0];
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors, 
      error: error.message,
    };
  }

  const  res  = await serverFetch(`/rooms/join`, {
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
  revalidateTag("rooms");
  revalidateTag("room-count");
  const data = await res.json();
  console.log(data);
  return { success: 'Successfully created', data };
}