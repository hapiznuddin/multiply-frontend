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

export default function CreateRoom() {
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
        <form action="" className="flex flex-col gap-4">
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
                <SelectItem value="1">Material 1</SelectItem>
                <SelectItem value="2">Material 2</SelectItem>
                <SelectItem value="3">Material 3</SelectItem>
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
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
