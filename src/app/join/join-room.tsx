"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { createRoomJoinAction } from "./action";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function JoinRoom() {
  const [state, formAction, isPending] = useActionState(createRoomJoinAction, {
    fieldErrors: {},
    error: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.data) {
      const { guest_token, room_id, id } = state.data.participant;

      // Clear old session data first
      localStorage.removeItem("guest_token");
      localStorage.removeItem("room_participant_id");

      // Save new session data
      localStorage.setItem("guest_token", guest_token);
      localStorage.setItem("room_participant_id", id);

      Swal.fire({
        title: "Success!",
        text: "You have successfully joined a room.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push(`/join/game?id=${room_id}`);
      });
    }

    if (state?.error) {
      Swal.fire({
        title: "Error!",
        text: state.error,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }, [state, router]);

  return (
    <div className="z-1 flex flex-col gap-8 bg-white/10 backdrop-blur-xs shadow-md rounded-xl mx-auto py-12 px-6 w-full max-w-lg border-2 border-white/20">
      <div className="flex flex-col gap-8 items-center justify-center text-white">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <p className="text-4xl font-black w-full text-center">Join a Quiz</p>
      </div>
      <form action={formAction} className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <Label className="text-xl font-bold text-white">Join Code</Label>
          <Input
            placeholder="Enter Join Code"
            name="room_code"
            type="text"
            required
            className="bg-white text-lg outline-none w-full h-12 px-4 py-4 rounded-lg focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[3px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-xl font-bold text-white">Name Student</Label>
          <Input
            placeholder="Enter Name Student"
            name="participant_name"
            type="text"
            required
            className="bg-white text-lg outline-none w-full h-12 px-4 py-4 rounded-lg focus-visible:border-secondary focus-visible:ring-secondary focus-visible:ring-[3px]"
          />
        </div>

        <Button size="lg" variant="defaultHome" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="size-6" />
              <p>Loading...</p>
            </div>
          ) : (
            "Join"
          )}
        </Button>
      </form>
    </div>
  );
}
