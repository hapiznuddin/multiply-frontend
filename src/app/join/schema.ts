import { z } from "zod";

export const formSchemaRoomJoin = z.object({
  room_code: z.string().min(1, "Room Code must be filled"),
  participant_name: z.string().min(1, "Participant Name must be filled"),
});

export type FormSchemaRoomJoin = z.infer<typeof formSchemaRoomJoin>;