import { Button } from "@/components/ui/button";
import "../globals.css";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function JoinPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690]">
      <div className="pattern" />
      <div className="z-1 flex flex-col gap-8 bg-white/10 backdrop-blur-xs shadow-md rounded-xl mx-auto py-12 px-6 w-full max-w-lg border-2 border-white/20">
        <div className="flex flex-col gap-8 items-center justify-center text-white">
          <Image src="/logo.png" alt="logo" width={200} height={200} />
          <p className="text-4xl font-black w-full text-center">Join a Quiz</p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <Label className="text-xl font-bold text-white">Join Code</Label>
            <Input
              placeholder="Enter Join Code"
              name="joinCode"
              type="text"
              className="bg-white text-lg outline-none w-full h-12 px-4 py-4 rounded-lg focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[3px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xl font-bold text-white">Name Student</Label>
            <Input
              placeholder="Enter Name Student"
              name="name"
              type="text"
              className="bg-white text-lg outline-none w-full h-12 px-4 py-4 rounded-lg focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[3px]"
            />
          </div>

          <Button size="lg" variant="defaultHome">
            <p className="text-lg font-black">Join</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
