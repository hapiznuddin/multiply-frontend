import { z } from "zod";

export const formSchemaRoom = z.object({
  material_id: z.coerce.number(),
  title: z.string().min(1, "Title must be filled"),
  max_players: z.coerce.number().min(1, "Description must be filled"),
});

export type FormSchemaRoom = z.infer<typeof formSchemaRoom>;
