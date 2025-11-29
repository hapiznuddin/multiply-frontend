"use client";

import { Button } from "@/components/ui/button";
import { startGameAction } from "./action";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export default function PlayButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePlay = async () => {
    startTransition(async () => {
      const { error } = await startGameAction(id);
      if (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Success!",
        text: "Game started successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.refresh();
      });
    });
  };

  return (
    <Button
      className="bg-green-600 hover:bg-green-700 text-white"
      onClick={handlePlay}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Spinner className="w-4 h-4 text-white" /> <p>Starting...</p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          Play Now
        </div>
      )}
    </Button>
  );
}
