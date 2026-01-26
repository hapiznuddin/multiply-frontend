"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";
import { deleteModuleAction } from "./action";
import { useRouter } from "next/navigation";

export default function DeleteQuestionButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      startTransition(async () => {
        await deleteModuleAction(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your question has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/dashboard/learning-corner");
        });
      });
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? (
        <div className="flex items-center gap-2">
          <Spinner /> <p>Loading...</p>
        </div>
      ) : (
        "Delete"
      )}
    </Button>
  );
}
