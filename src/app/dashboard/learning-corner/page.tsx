import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreateModule from "./create-module";
import { getModuleAction } from "./action";
import { Module } from "@/app/types/moduleType";
import EditModule from "./edit-module";
import { Separator } from "@/components/ui/separator";

export default async function LearningCorner() {
  const modules = await getModuleAction();
  return (
    <div className="flex flex-col gap-4 m-4 mt-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Learning Corner</h1>
        <CreateModule />
      </div>
      <Card className="flex flex-col gap-2 p-4">
        <div className="flex justify-between items-center p-2 gap-4 w-full">
          <div className="flex justify-between items-center gap-4 p-2 w-full">
            <p className="w-full">Title Module</p>
            <p className="w-full">Description</p>
          </div>
          <div className="w-38"></div>
        </div>
        <Separator />
        {modules?.data?.map((module: Module) => (
          <div
            key={module.id}
            className="flex justify-between items-center gap-4 hover:bg-slate-100 p-2 rounded-md"
          >
            <Link
              href={`/dashboard/learning-corner/${module.id}`}
              className="w-full"
            >
              <div className="flex justify-between items-center gap-4 w-full">
                <h2 className="text-lg font-medium w-full max-w-md">
                  {module.title}
                </h2>
                <div
                  className="text-sm text-slate-700 w-full max-w-md line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: module.content }}
                />
              </div>
            </Link>
            <div className="flex gap-2">
              <EditModule module={module} />
              <Link href={`/dashboard/learning-corner/${module.id}`}>
                <Button variant="defaultHome">Detail</Button>
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
