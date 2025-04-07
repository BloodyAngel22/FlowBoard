"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useProjectId } from "@/app/stores/useProjectId";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { columnValidator } from "@/app/validators/columnValidator";
import { IColumnForm } from "@/app/types/IColumn.form";
import { useEffect } from "react";
import FormInput from "../Forms/FormInput";
import FormCheckbox from "../Forms/FormCheckbox";
import { useColumn, useUpdateColumn, useDeleteColumn } from "@/app/hooks/useColumns";
import { IColumnModifyRequest } from "@/app/types/IColumn";
import AlertDelete from "./AlertDelete";
import { Loader2 } from "lucide-react";
import FormColorPicker from "../Forms/FormColorPicker";

interface ColumnDialogProps {
  columnId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

function ColumnDialogContent({ projectId, columnId, onClose }: { projectId: string; columnId: string; onClose: () => void }) {
  const { data, isSuccess, isLoading, isError, error } = useColumn(projectId, columnId);
  const { mutate: updateColumn, isPending: isUpdating, isError: isUpdatingError, error: updatingError } = useUpdateColumn(projectId, columnId);
  const { mutate: deleteColumn, isPending: isDeleting, isError: isDeletingError, error: deletingError } = useDeleteColumn(projectId, columnId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<IColumnForm>({
    mode: "onChange",
    resolver: yupResolver(columnValidator),
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      reset({
        name: data.data.name || "",
        isFinished: data.data.isFinished || false,
        color: data.data.color || null,
      });
    }
  }, [isSuccess, data, reset]);

  if (isLoading) {
     return (
       <DialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sm:max-w-[425px]">
         <DialogHeader>
           <DialogTitle>Loading...</DialogTitle>
         </DialogHeader>
         <div className="flex h-40 w-full items-center justify-center">
           <Loader2 className="h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400" />
         </div>
       </DialogContent>
     );
  }

  if (isError) {
    return (
      <DialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-zinc-800 dark:text-zinc-100">
            Ошибка
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error?.message || "Произошла ошибка при загрузке данных колонки"}
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    );
  }

  const handleSubmitForm = (formData: IColumnForm) => {
    console.log("Form data:", formData);

    if (isValid && data?.data) {
      const updatedColumn: IColumnModifyRequest = {
        name: formData.name,
        isFinished: formData.isFinished,
        position: data.data.position,
        color: formData?.color || null,
      };

      updateColumn(updatedColumn, {
        onSuccess: () => {
          onClose();
        },
        onError: (err) => {
          console.error("Update failed:", err);
        },
      });
    }
  };

  if (isSuccess && data?.data) {
    return (
      <DialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              <FormInput
                register={register}
                name="name"
                errors={errors}
                withoutStyle
              />
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 mb-6 max-h-[400px] w-full overflow-y-auto pr-4">
            <div className="flex w-full flex-col gap-4">
              <FormCheckbox
                control={control}
                name="isFinished"
                label="Является ли колонка завершающей?"
                errors={errors}
              />
              <FormColorPicker
                control={control}
                name="color"
                label="Цвет"
                errors={errors}
              />
            </div>
          </div>
          {isUpdatingError && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-2 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              Ошибка обновления:{" "}
              {updatingError?.message ||
                "Произошла ошибка при обновлении колонки"}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={onClose} disabled={isUpdating || isDeleting} className="close-button">
              Закрыть
            </Button>
            <AlertDelete
              title="Вы точно хотите удалить колонку?"
              description="Это действие нельзя будет отменить. Это удалит колонку и все связанные с ней задачи."
              mutation={deleteColumn}
              isPending={isDeleting}
              isError={isDeletingError}
              error={deletingError}
              onSuccess={onClose}
            />
            <Button
              type="submit"
              disabled={!isValid || isUpdating || isDeleting}
              className="save-button"
            >
              {isUpdating ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    );
  }

  return null;
}

export default function ColumnDialog({ columnId, isOpen, onClose }: ColumnDialogProps) {
  const { projectId } = useProjectId();

  if (!isOpen || !projectId || !columnId) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ColumnDialogContent projectId={projectId} columnId={columnId} onClose={onClose} />
    </Dialog>
  );
}