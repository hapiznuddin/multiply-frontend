'use server';
import { serverFetch } from "@/lib/serverFetch";
import { FormQuestionInput, formSchemaQuestion } from "./schema";
import { ApiErrorResponse } from "@/app/types/errorType";
import { revalidateTag } from "next/cache";
import { parseNestedFormData } from "./parseForm";

export async function questionAction(
  _prevState: { error?: string; success?: string },
  formData: FormData
) {
 // STEP 1 → Parse nested fields: options[0][option_text] => array
  const parsedPayload = parseNestedFormData(formData);

  // STEP 2 → Validate using Zod (now options[] is correct)
  const result = formSchemaQuestion.safeParse(parsedPayload);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  // Validated data type based on schema
  const payload: FormQuestionInput = result.data;

  const  res  = await serverFetch(`/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    const message =
      data?.message;
    return { error: message };
  }
  revalidateTag("questions");
  const data = await res.json();
  console.log(data);
  return { success: 'Successfully created', data };
}