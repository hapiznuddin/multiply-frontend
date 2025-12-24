export interface Material {
  id: number;
  user_id: string; // UUID
  title: string;
  description: string | null;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  questions_count: number;
}

export interface QuestionOption {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface Question {
  id: number;
  material_id: number;
  question_text: string;
  correct_answer: string | null; // null for MCQ
  type: "multiple_choice" | "input";
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  options: QuestionOption[]; // empty array for input-type
}

export interface Room {
  id: number;
  user_id: string;
  material_id: number;
  code: string;
  status: "created" | "started" | "finished";
  title: string;
  max_players: number | null;
  time_limit_per_question: number;
  started_at: string | null;
  finished_at: string | null;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  badge_type: "bronze" | "silver" | "gold" | "platinum";
  requirement_type: string;
  requirement_value: number;
}
