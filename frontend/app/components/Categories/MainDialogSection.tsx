"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import CategoriesScrollArea from "./CategoriesScrollArea";
import CreateCategoryDialog from "./CreateCategoryDialog";

export function MainDialogSection() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Категории</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Категории</DialogTitle>
        </DialogHeader>
        <div className="mt-6 mb-6 max-h-[450px] overflow-y-auto pr-4">
          <div className="flex w-full flex-col gap-4">
            <CreateCategoryDialog />
            <CategoriesScrollArea />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Закрыть</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}