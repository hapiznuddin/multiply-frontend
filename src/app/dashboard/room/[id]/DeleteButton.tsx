"use client";

import { Button } from "@/components/ui/button";
import { deleteRoomAction } from "./action";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
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
        await deleteRoomAction(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your room has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/dashboard");
        });
      });
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? (
        <div>
          <Spinner /> <p>loading...</p>
        </div>
      ) : (
        "Delete Room"
      )}
    </Button>
  );
}
