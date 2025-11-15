import { Button } from "@/components/ui/button";
import "./globals.css";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690]">
      <div className="pattern" />
      <div className="z-1 flex flex-col gap-16 items-center justify-center">
        <div className="flex flex-col gap-8 items-center justify-center text-white">
          <h1 className="font-extrabold text-8xl">Multiply Quiz</h1>
          <p className="text-4xl font-medium w-full text-center">
            A dynamis quiz platform for engaging learning experiences
          </p>
        </div>
        <div className="flex gap-8">
          <Button size="lg" className="h-full py-3 px-8 w-56">
            <div className="flex flex-col items-start justify-start">
              <p className="text-lg">Teacher</p>
              <p className="text-3xl font-bold ">Sign Up</p>
            </div>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-full py-3 px-8 w-56"
          >
            <div className="flex flex-col items-start justify-start">
              <p className="text-lg">Student</p>
              <p className="text-3xl font-bold ">Join Code</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
