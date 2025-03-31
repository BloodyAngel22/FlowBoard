"use client";

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
import { useDeleteProject } from "@/app/hooks/useProjects";
import { Trash2 } from "lucide-react";

interface DeleteProjectAlertProps {
  projectId: string;
}

export default function DeleteProjectAlert({
  projectId,
}: DeleteProjectAlertProps) {
  const {
    mutate: deleteProject,
    isPending,
    isError,
    error,
  } = useDeleteProject(projectId);

  const handleDelete = () => {
    deleteProject(undefined, {
      onSuccess: () => {
        console.log("Project deleted successfully");
      },
      onError: (err) => {
        console.error("Failed to delete project:", err);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-500"
        >
          <Trash2 size={16} className="mr-0.5" />
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить проект?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя будем отменить после. Это удалит ваш проект и
            все его данные.
            {isError && (
              <span className="text-red-500 block mt-2">{error?.message}</span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
