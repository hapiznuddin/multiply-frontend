import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import CreateQuiz from "./create-quiz";
import { getMaterialAction } from "./action";
import { Material } from "@/app/types/quizType";

export default async function QuizPage() {
  const materials = await getMaterialAction();

  return (
    <div className="flex flex-col gap-4 m-4 mt-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">List Quizes</h1>
        <CreateQuiz />
      </div>
      <Card className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center p-2">
          <p>Title Quiz</p>
          <p>Description</p>
          <div className="w-24"></div>
        </div>
        <Separator />
        {materials.data.map((material: Material) => (
          <Link href={`/dashboard/quizes/${material.id}`} key={material.id}>
            <div className="flex justify-between items-center gap-4 hover:bg-slate-100 p-2 rounded-md ">
              <div>
                <h2 className="text-lg font-medium">{material.title}</h2>
                <p className="text-xs text-slate-400">
                  {material.questions_count} Question
                </p>
              </div>
              <p className="text-sm text-slate-600 w-full max-w-sm line-clamp-2">
                {material.description}
              </p>
              <div className="flex gap-2">
                <Button>Edit</Button>
                <Button variant="defaultHome">Detail</Button>
              </div>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
}
