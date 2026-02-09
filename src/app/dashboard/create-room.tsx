"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Material } from "../types/quizType";
import { useActionState } from "react";
import { createRoomAction } from "./action";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function CreateRoom({ data }: { data: Material[] }) {
  const [state, formAction, isPending] = useActionState(createRoomAction, {
    fieldErrors: {},
    error: "",
  });

  useEffect(() => {
    if (state?.success) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully created a room.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
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
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Create a new room to start a quiz.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Room Name</Label>
            <Input placeholder="Type room name" name="title" id="title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Choose Material</Label>
            <Select name="material_id">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a material" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((material) => (
                  <SelectItem key={material.id} value={material.id.toString()}>
                    {material.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="max_player">Max Player</Label>
            <Input
              type="number"
              placeholder="Type max player"
              name="max_players"
              id="max_player"
            />
          </div>
          <DialogFooter className="w-full flex justify-between items-center ">
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-6" />
                  <p>Loading...</p>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
