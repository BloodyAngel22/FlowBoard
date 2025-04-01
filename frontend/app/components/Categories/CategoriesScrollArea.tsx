"use client";

import { useCategories } from "@/app/hooks/useCategories";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { EllipsisVertical, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryAlert from "./DeleteCategoryAlert";

export default function CategoriesScrollArea() {
  const { data, isSuccess, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        variant="destructive"
        className="mx-auto my-4 max-w-2xl border-red-600 bg-red-50 dark:border-red-900 dark:bg-red-950/50"
      >
        <AlertTitle className="text-red-800 dark:text-red-300">
          Ошибка загрузки категорий
        </AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-400">
          {error?.message ||
            "Произошла ошибка при загрузке категорий. Пожалуйста, попробуйте позже."}
        </AlertDescription>
      </Alert>
    );
  }

  if (isSuccess && data.data) {
    return (
      <ScrollArea className="h-72 w-full pr-6">
        <div>
          <h4 className="mb-2 font-bold">Ваши категории</h4>
          {data.data.map((category) => (
            <div key={category.id}>
              <div className="flex flex-row gap-2 justify-between items-center py-2">
                <p>{category.name}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-zinc-800 py-1 px-2 rounded-lg text-white">
                    <DropdownMenuItem asChild>
                      <EditCategoryDialog category={category} />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteCategoryAlert categoryId={category.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  return null;
}
