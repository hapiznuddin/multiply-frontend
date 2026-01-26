import "../globals.css";
import JoinRoom from "./join-room";

export default function JoinPage() {
  
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-[#8B5DF6] to-[#513690]">
      <div className="pattern" />
      <JoinRoom />
    </div>
  );
}
