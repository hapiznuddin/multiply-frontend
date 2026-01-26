"use client";

import { Button } from "@/components/ui/button";
import { finishRoomAction } from "./action";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { CheckSquare } from "lucide-react";

export default function FinishButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleFinish = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to finish this game?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, finish it!",
    });

    if (result.isConfirmed) {
      startTransition(async () => {
        const { error } = await finishRoomAction(id);
        if (error) {
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
          });
          return;
        }
        Swal.fire({
          title: "Finished!",
          text: "Game finished successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.refresh();
        });
      });
    }
  };

  return (
    <Button
      onClick={handleFinish}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Spinner className="w-4 h-4 text-white" /> <p>Finishing...</p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4" />
          Finish Quiz
        </div>
      )}
    </Button>
  );
}
