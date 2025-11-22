export interface Room {
  id: number;
  user_id: string; // UUID
  question_set_id: number;
  code: string;
  title: string;
  max_players: number | null; // nullable
  status: "created" | "active" | "started" | "finished";
  starts_at: string | null;    // ISO datetime
  started_at: string | null;   // ISO datetime
  finished_at: string | null;  // ISO datetime
  created_at: string;          // ISO datetime
  updated_at: string;          // ISO datetime
}