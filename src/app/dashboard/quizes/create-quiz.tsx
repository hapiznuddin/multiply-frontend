'use client';

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { materialAction } from "./action";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";

export default function CreateQuiz() {
  const [state, formAction, isPending] = useActionState(materialAction, {
    fieldErrors: {},
    error: "",
  });

  if (state?.error) {
    Swal.fire({
      title: "Error!",
      text: state.error,
      icon: "error",
      confirmButtonText: "Try Again",
    })
  }

  if (state?.success) {
    Swal.fire({
      title: "Success!",
      text: state.success,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    })
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Quiz</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Material Quiz</DialogTitle>
          <DialogDescription>
            Create material first for create a quiz.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Type your title" />
            </div>
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Type your description" />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="submit" className="w-full mt-4" disabled={isPending}>
                {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="size-6" />
                <p>Loading...</p>
              </div>
            ) : (
              "Save"
            )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
