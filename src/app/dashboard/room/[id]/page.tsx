import { Separator } from "@/components/ui/separator";
import getRoomAction from "./action";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./DeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlayButton from "./PlayButton";
import { Question } from "@/app/types/quizType";
import FinishButton from "./FinishButton";
import ParticipantList from "./ParticipantList";

export default async function RoomDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const { data } = await getRoomAction(id);
  console.log(data);
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{data?.room?.title}</h1>
          <h2 className="text-xl font-semibold">
            Room Code: {data?.room?.code}
          </h2>
          <div className="flex gap-2">
            <p>Max Student: {data?.room?.max_players}</p>
            <Badge
              className={(() => {
                switch (data?.room?.status) {
                  case "created":
                    return "bg-blue-500 text-white";
                  case "started":
                    return "bg-green-600 text-white";
                  case "finished":
                    return "bg-red-500 text-white";
                  default:
                    return "bg-primary text-white";
                }
              })()}
            >
              {data?.room?.status}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {data?.room?.status === "created" ||
            (data?.room?.status === "finished" && <PlayButton id={id} />)}
          {data?.room?.status === "started" && <FinishButton id={id} />}
          <DeleteButton id={id} />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full lg:w-11/12">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              {data?.room?.material?.title}
            </h2>
            <p className="text-sm text-slate-500">
              {data?.room?.material?.description}
            </p>
          </div>
          <ScrollArea className="w-full h-[600px] rounded-md border mt-2">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-full p-4">
                    {data?.questions?.length || 0} Question
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.questions?.length > 0 ? (
                  data?.questions?.map((question: Question, index: number) => (
                    <TableRow key={question.id} className="border-b">
                      <TableCell>
                        <div className="flex flex-col gap-4 p-4">
                          <div className="flex items-center w-full justify-between">
                            <p className="text-xs text-slate-500">
                              {index + 1}.{" "}
                              {question.type === "multiple_choice"
                                ? "Multiple Choice"
                                : "Input"}
                            </p>
                          </div>
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
                                  className="flex items-center gap-2"
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No questions created
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-6/12">

          <ParticipantList id={id} />
        </div>
      </div>
    </div>
  );
}
