export interface Material {
  id: number;
  user_id: string; // UUID
  title: string;
  description: string | null;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  questions_count: number;
}