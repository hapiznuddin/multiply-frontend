import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreateModule from "./create-module";

export default function LearningCorner() {
  return (
    <div className="flex flex-col gap-4 m-4 mt-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Learning Corner</h1>
        <CreateModule />
      </div>
      <Card className="flex flex-col gap-2 p-4">
        <div className="flex justify-between items-center p-2">
          <p>Title Module</p>
          <p>Description</p>
          <div className="w-24"></div>
        </div>
        <Separator />
      </Card>
    </div>
  );
}
