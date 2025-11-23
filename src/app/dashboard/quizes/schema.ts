import { z } from "zod";

export const formSchemaMaterial = z.object({
  title: z.string().min(1, "Title must be filled"),
  description: z.string().min(1, "Description must be filled"),
});

export type FormSchemaMaterial = z.infer<typeof formSchemaMaterial>;