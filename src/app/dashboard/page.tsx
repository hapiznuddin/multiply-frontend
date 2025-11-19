import Image from "next/image";

export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="w-full rounded-xl p-8 text-white bg-purple-500 border-4 border-purple-600 gap-4 shadow-sm flex items-center">
          <Image src="/assets/quiz.png" alt="logo" width={100} height={32} />
          <div>
            <h1 className="text-6xl font-black">12</h1>
            <p className="text-3xl font-bold">Quiz Created</p>
          </div>
        </div>
        <div className="w-full rounded-xl p-8 text-white bg-purple-500 border-4 border-purple-600 gap-4 shadow-sm flex items-center">
          <Image src="/assets/choose.png" alt="logo" width={100} height={32} />
          <div>
            <h1 className="text-6xl font-black">12</h1>
            <p className="text-3xl font-bold">Room Created</p>
          </div>
        </div>
        <div className="w-full rounded-xl p-8 text-white bg-purple-500 border-4 border-purple-600 gap-4 shadow-sm flex items-center">
          <Image src="/assets/group.png" alt="logo" width={100} height={32} />
          <div>
            <h1 className="text-6xl font-black">12</h1>
            <p className="text-3xl font-bold">Participant Joined</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-400 w-full h-16 rounded-xl" />
      <div className="bg-amber-400 w-full h-16 rounded-xl" />
      <div className="bg-amber-400 w-full h-16 rounded-xl" />
      <div className="bg-amber-400 w-full h-16 rounded-xl" />
      <div className="bg-amber-400 w-full h-16 rounded-xl" />
      <div className="bg-amber-400 w-full h-16 rounded-xl" />
    </div>
  );
}
