import { Card } from "@/components/ui/card";
import Image from "next/image";
import { getUserAction } from "./action";
import { Room } from "../types/roomType";
import { Button } from "@/components/ui/button";
import CreateRoom from "./create-room";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PlayButton from "./room/[id]/PlayButton";
import FinishButton from "./room/[id]/FinishButton";

export const dynamic = "force-dynamic";
export default async function Page() {
  const {
    roomsData,
    quizCountData,
    roomCountData,
    materialsData,
    participantCountData,
  } = await getUserAction();

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
            <h1 className="text-4xl font-black">{participantCountData}</h1>
            <p className="text-xl font-bold">Participant Joined</p>
          </div>
        </div>
      </div>
      <Card className="flex flex-col gap-4 px-4 border">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">List of Rooms</h1>
          <CreateRoom data={materialsData} />
        </div>
        {roomsData?.map((room: Room) => (
          <Card
            className="w-full p-4 rounded-xl flex justify-between hover:bg-slate-50"
            key={room.id}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-bold">{room.code}</p>
                  <Badge
                    className={(() => {
                      switch (room.status) {
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
                    {room.status}
                  </Badge>
                </div>
                <h1 className="text-xl font-bold">{room.title}</h1>
              </div>
              <div className="flex gap-2">
                {(room.status === "created" || room.status === "finished") && (
                  <PlayButton id={room.id} />
                )}
                {room.status === "started" && <FinishButton id={room.id} />}
                <Button variant="secondary" asChild>
                  <Link href={`/dashboard/room/${room.id}`}>Detail</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
}
