"use client"

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
} from "@/app/components/ui/alert-dialog"
import { Button } from "@/app/components/ui/button"
import { useDeleteProject } from "@/app/hooks/useProjects"
import { Trash2 } from "lucide-react"

interface DeleteProjectAlertProps {
  projectId: string
}

export default function DeleteProjectAlert({ projectId }: DeleteProjectAlertProps) {
  const { mutate: deleteProject, isPending, isError, error } = useDeleteProject(projectId)

  const handleDelete = () => {
    deleteProject(undefined, {
      onSuccess: () => {
        console.log("Project deleted successfully")
      },
      onError: (err) => {
        console.error("Failed to delete project:", err)
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
        >
          <Trash2 size={16} />
          <span>Удалить</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-800 dark:text-zinc-100">
            Вы уверены, что хотите удалить проект?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-600 dark:text-zinc-400">
            Это действие нельзя будет отменить. Это удалит ваш проект и все его данные.
            {isError && (
              <span className="text-red-500 dark:text-red-400 block mt-2 p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-900">
                {error?.message || "Произошла ошибка при удалении проекта"}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            disabled={isPending}
            className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Отменить
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
          >
            {isPending ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}