import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMaterialIdAction } from "./action";
import { Question } from "@/app/types/quizType";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DetailQuiz({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data } = await getMaterialIdAction(id);

  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">{data?.material?.title}</h1>
          <p className="text-slate-600">{data?.material?.description}</p>
        </div>
        <Link
          href={`/dashboard/quizes/${id}/create-question?title=${data?.material?.title}`}
        >
          <Button>Create Question</Button>
        </Link>
      </div>
      <div className="border rounded-lg mb-8">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-full p-4">
                {data?.material?.questions_count} Question
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.questions?.map((question: Question, index: number) => (
              <TableRow key={question.id} className="border-b">
                <TableCell className="p-4">
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-slate-500">
                      {index + 1}.{" "}
                      {question.type === "multiple_choice"
                        ? "Multiple Choice"
                        : "Input"}
                    </p>
                    <p className="font-bold text-base">
                      {question.question_text}
                    </p>
                    <div className="flex flex-col gap-2">
                      <p>Answer :</p>
                      <p className="text-slate-800">
                        {question.correct_answer}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option) => (
                          <div
                            className="flex items-center gap-2 "
                            key={option.id}
                          >
                            <Checkbox
                              id={option.option_text}
                              checked={option.is_correct}
                            />
                            <Label htmlFor={option.option_text}>
                              {option.option_text}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
