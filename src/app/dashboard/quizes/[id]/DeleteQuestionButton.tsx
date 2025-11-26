"use client";

import { Button } from "@/components/ui/button";
import { deleteQuestionAction } from "./action";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function DeleteQuestionButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

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
        await deleteQuestionAction(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your question has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete} disabled={isPending}>
      {isPending ? <Spinner /> : <Trash2 />}
    </Button>
  );
}
