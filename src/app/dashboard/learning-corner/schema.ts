import { z } from "zod";

export const formSchemaModule = z.object({
  title: z.string().min(1, "Title must be filled"),
  video_url: z.string().min(1, "Video URL must be filled"),
  content: z.string().min(1, "Content must be filled"),
});

export type FormSchemaModule = z.infer<typeof formSchemaModule>;