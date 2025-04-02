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
import { useDeleteCategory } from "@/app/hooks/useCategories";
import { useBoard } from "@/app/stores/useBoard";
import { Trash2 } from "lucide-react";

interface DeleteCategoryAlertProps {
  categoryId: string;
}

export default function DeleteCategoryAlert({ categoryId }: DeleteCategoryAlertProps) {
  const { mutate: deleteCategory, isPending } = useDeleteCategory(categoryId);

  const { board: boardStore } = useBoard();

  const handleDelete = () => {
    deleteCategory(undefined, {
      onSuccess: () => {
        console.log("Category deleted successfully");
      },
      onError: (error) => {
        console.error("Failed to delete category:", error);
      },
    });
  };

  const isExistingCategoryId = boardStore.columns.some((column) =>
    column.cards.some((card) => card.metadata.categoryId === categoryId)
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={16} className="mr-2" />
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить эту категорию?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="block">
              Это действие нельзя будем отменить позже. Категория будет удалена
              навсегда. Все связанные с нею задачи потеряют категорию.
            </span>
            {isExistingCategoryId && (
              <span className="text-red-400 mt-2 block">
                Эта категория используется в задачах и не может быть удалена.
                Пожалуйста, выберите другую категорию или очистите её в задачах.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="close-button">Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending || isExistingCategoryId}
            className="alert-delete"
          >
            {isPending ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}