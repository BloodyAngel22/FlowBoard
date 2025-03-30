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
          variant="default"
          className="bg-red-400 hover:bg-red-500/90 text-white"
        >
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col">
            {description}
            <span className="text-red-400">{isError && error?.message}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {isPending ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
