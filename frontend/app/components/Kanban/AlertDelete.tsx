import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { UseMutateFunction } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

interface AlertDeleteProps<TData = any> {
  title?: string;
  description?: string;
  mutation: UseMutateFunction<TData, Error, void>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  onSuccess: () => void;
}

export default function AlertDelete<TData = any>({
  title = "Вы точно хотите удалить?",
  description = "Это действие нельзя будем отменить после. Это удалит ваши данные.",
  mutation,
  isPending,
  isError,
  error,
  onSuccess,
}: AlertDeleteProps<TData>) {
  const handleDelete = () => {
    mutation(undefined, {
      onSuccess: () => {
        onSuccess();
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-800 dark:text-zinc-100">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-600 dark:text-zinc-400">
            {description}
            {isError && error && (
              <span className="mt-2 block rounded border border-red-200 bg-red-50 p-2 text-red-500 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                {error.message}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            {isPending ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
