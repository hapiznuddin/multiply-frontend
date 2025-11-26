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
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
      }).then(() => {
        router.push(`/dashboard/quizes/${id}`);
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
  }, [state, router, id]);

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

    if (field === "is_correct" && value === true) {
      copy.forEach((opt, i) => {
        copy[i] = { ...opt, is_correct: false };
      });
    }

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
          className="w-full h-72 text-center text-xl"
          placeholder="Type your question here"
        />
        {type === "multiple_choice" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {options.map((opt, i) => (
              <div
                key={i}
                className="border p-2 flex flex-col gap-2 rounded-lg shadow-sm"
              >
                <Checkbox
                  checked={opt.is_correct as boolean}
                  name={`options[${i}][is_correct]`}
                  className="w-6 h-6"
                  onCheckedChange={(checked) =>
                    updateOption(i, "is_correct", checked as boolean)
                  }
                />
                {/* <input
                  type="checkbox"
                  name={`options[${i}][is_correct]`}
                  value="1"
                  className="w-6 h-6 rounded border border-gray-300 bg-gray-50 focus:ring-1 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  checked={opt.is_correct}
                  onChange={(e) =>
                    updateOption(i, "is_correct", e.target.checked)
                  }
                /> */}

                <Input
                  type="text"
                  value={opt.option_text}
                  className="w-full h-full min-h-48 text-center border-0 shadow-none"
                  onChange={(e) =>
                    updateOption(i, "option_text", e.target.value)
                  }
                  placeholder={`Type your option here`}
                />

                {/* HIDDEN INPUTS — FIXED */}
                <input
                  type="hidden"
                  name={`options[${i}][option_text]`}
                  value={opt.option_text}
                />

                {/* 
                <input
                  type="hidden"
                  name={`options[${i}][is_correct]`}
                  value={opt.is_correct ? "1" : "0"}
                /> */}
              </div>
            ))}
          </div>
        )}

        {type === "input" && (
          <div>
            <Input
              name="correct_answer"
              className="w-full text-center h-full min-h-48"
              placeholder="Type the correct answer"
            />
          </div>
        )}
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="size-6" />
              <p>Loading...</p>
            </div>
          ) : (
            "Save Question"
          )}
        </Button>
      </Card>
    </form>
  );
}
