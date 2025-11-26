import { Card } from "@/components/ui/card";
import Image from "next/image";
import { getUserAction } from "./action";
import { Room } from "../types/roomType";
import { Button } from "@/components/ui/button";
import CreateRoom from "./create-room";

export const dynamic = "force-dynamic";
export default async function Page() {
  const { roomsData, quizCountData, roomCountData } = await getUserAction();
  console.log(roomsData);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="w-full rounded-xl h-32 p-4 text-white bg-purple-500 border-4 border-purple-600 gap-4 shadow-sm flex items-center">
          <Image src="/assets/quiz.png" alt="logo" width={70} height={100} />
          <div>
            <h1 className="text-4xl font-black">{quizCountData}</h1>
            <p className="text-xl font-bold">Quiz Created</p>
          </div>
        </div>
        <div className="w-full rounded-xl h-32 p-4 text-white bg-purple-500 border-4 border-purple-600 gap-4 shadow-sm flex items-center">
          <Image src="/assets/choose.png" alt="logo" width={70} height={32} />
          <div>
            <h1 className="text-4xl font-black">{roomCountData}</h1>
            <p className="text-xl font-bold">Room Created</p>
          </div>
        </div>
        <div className="w-full rounded-xl h-32 p-4 text-white bg-purple-500 border-4 border-purple-600 gap-4 shadow-sm flex items-center">
          <Image src="/assets/group.png" alt="logo" width={70} height={32} />
          <div>
            <h1 className="text-4xl font-black">12</h1>
            <p className="text-xl font-bold">Participant Joined</p>
          </div>
        </div>
      </div>
      <Card className="flex flex-col gap-4 px-4 border">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">List of Quiz</h1>
          <CreateRoom />
        </div>
        {roomsData?.map((room: Room) => (
          <Card
            className="w-full p-4 rounded-xl flex justify-between"
            key={room.id}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-sm">{room.code}</p>
                <h1 className="text-lg font-bold">{room.title}</h1>
              </div>
              <div className="flex gap-2">
                <Button>Play Now</Button>
                <Button variant="secondary" className="">
                  Detail
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
}
