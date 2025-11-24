"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { questionAction } from "./action";
import Swal from "sweetalert2";

export type Option = {
  option_text: string;
  is_correct: boolean;
};

export default function InputQuestion({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [state, formAction, isPending] = useActionState(questionAction, {
    fieldErrors: {},
    error: "",
  });

  useEffect(() => {
    if (state?.success) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully created a question.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (state?.error) {
      Swal.fire({
        title: "Error!",
        text: state.error,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }, [state]);

  const [type, setType] = useState("multiple_choice");

  const [options, setOptions] = useState<Option[]>([
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ]);

  const updateOption = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const copy = [...options];
    copy[index] = { ...copy[index], [field]: value };
    setOptions(copy);
  };

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <input type="hidden" name="material_id" value={id} />
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Create Question</h1>
          <p className="text-xl text-slate-700">{title}</p>
        </div>
        <Select
          onValueChange={setType}
          defaultValue="multiple_choice"
          value={type}
        >
          <SelectTrigger className="w-full max-w-56">
            <SelectValue placeholder="Select type question" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
              <SelectItem value="input">Input</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="hidden" name="type" value={type} />
      </div>

      <Card className="flex flex-col gap-4 p-4">
        <Input
          name="question_text"
          type="text"
          className="w-full h-72 text-center bg-violet-300 text-xl"
          placeholder="Type your question here"
        />
        {type === "multiple_choice" && (
          <div className="grid grid-cols-2 gap-4">
            {options.map((opt, i) => (
              <div key={i} className="border p-2 flex flex-col gap-2">
                <Checkbox
                  checked={opt.is_correct}
                  onCheckedChange={(v) =>
                    updateOption(i, "is_correct", v === true)
                  }
                />

                <Input
                  type="text"
                  value={opt.option_text}
                  onChange={(e) =>
                    updateOption(i, "option_text", e.target.value)
                  }
                  placeholder={`Option ${i + 1}`}
                />

                {/* HIDDEN INPUTS — FIXED */}
                <input
                  type="hidden"
                  name={`options[${i}][option_text]`}
                  value={opt.option_text}
                />

                <input
                  type="hidden"
                  name={`options[${i}][is_correct]`}
                  value={opt.is_correct ? "1" : "0"}
                />
              </div>
            ))}
          </div>
        )}

        {type === "input" && (
          <div>
            <Input
              name="correct_answer"
              className="w-full text-center"
              placeholder="Type the correct answer"
            />
          </div>
        )}
        <Button type="submit">Save Question</Button>
        <button
  type="button"
  onClick={() => {
    const form = document.querySelector("form");
    const fd = new FormData(form!);
    console.log("CLIENT FORMDATA:", Object.fromEntries(fd.entries()));
  }}
>
  DEBUG FORM
</button>
      </Card>
    </form>
  );
}
