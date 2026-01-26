import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nama must be filled"),
  email: z.string().min(1, "Email must be filled").email("Email invalid"),
  password: z
    .string()
    .min(1, "Password must be filled")
    .min(8, "Password must be at least 8 characters"),
});

export type FormSchema = z.infer<typeof formSchema>;
