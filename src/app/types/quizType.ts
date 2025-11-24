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