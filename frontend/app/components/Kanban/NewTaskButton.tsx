import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

interface NewTaskButtonProps {
  title: string;
  setTitle: (title: string) => void;
  handleAddTask: () => void;
}

export default function NewTaskButton({ title, setTitle, handleAddTask }: NewTaskButtonProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Добавить задачу</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить задачу</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Название задачи"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <DialogFooter className="justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleAddTask}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
