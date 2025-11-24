export type ParsedOption = {
  option_text?: string;
  is_correct?: string;
};

export type ParsedFormOutput = {
  material_id?: string | number;
  question_text?: string;
  type?: string;
  correct_answer?: string;
  options?: ParsedOption[];
  [key: string]: unknown;
};

export function parseNestedFormData(formData: FormData): ParsedFormOutput {
  const raw = Object.fromEntries(formData.entries());
  const output: ParsedFormOutput = {};
  const options: ParsedOption[] = [];

  for (const [key, value] of Object.entries(raw)) {
    const match = key.match(/^options\[(\d+)\]\[(\w+)\]$/);

    if (match) {
      const index = Number(match[1]);
      const field = match[2] as keyof ParsedOption;

      // HINDARI assign File
      if (value instanceof File) continue;

      if (!options[index]) {
        options[index] = {};
      }

      options[index][field] = value;
    } else {
      // Field selain options
      output[key] = value;
    }
  }

  if (options.length > 0) {
    output.options = options;
  }

  return output;
}
