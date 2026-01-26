"use client";

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
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useActionState } from "react";
import { moduleAction } from "./action";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function CreateModule() {
  const [state, formAction, isPending] = useActionState(moduleAction, {
    fieldErrors: {},
    error: "",
  });
  useEffect(() => {
      if (state?.success) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully created a module.",
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
        <Button>Create Module</Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-max lg:max-w-max mx-auto">
        <DialogHeader>
          <DialogTitle>Create Module</DialogTitle>
          <DialogDescription className="w-4/4 md:w-2xl lg:w-5xl">
            Create module for learning corner.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Type your title" required/>
            </div>
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="video_url">Link Video</Label>
              <Input
                id="video_url"
                name="video_url"
                placeholder="Type your link video"
                required
              />
            </div>
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="content">Module Content</Label>
              <RichTextEditor
                name="content"
                placeholder="Type your module content"
              />
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
