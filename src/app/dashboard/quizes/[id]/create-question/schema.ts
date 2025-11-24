import { z } from "zod";

export const optionSchema = z.object({
  option_text: z.string(),
  is_correct: z.coerce.boolean(),
});

export const formSchemaQuestion = z.object({
  material_id: z.coerce.number(),
  question_text: z.string().min(1),
  type: z.enum(["multiple_choice", "input"]),
  correct_answer: z.string().optional().nullable(),
  options: z.array(optionSchema).optional(),
});

export type FormQuestionInput = z.infer<typeof formSchemaQuestion>;