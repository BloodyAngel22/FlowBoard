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
      });
    }
  }, [isSuccess, data, reset]);

  if (isLoading) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
        <div>Loading...</div>
      </DialogContent>
    );
  }

  if (isError) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
        </DialogHeader>
        <div>Error: {error?.message}</div>
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
      <DialogContent>
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
          <div className="h-[150px] w-full overflow-y-auto mt-4 mb-8 pr-4">
            <div className="flex flex-col gap-3 justify-start items-start space-x-2 w-full">
              <FormCheckbox
                control={control}
                name="isFinished"
                label="Является ли колонка завершающей?"
                errors={errors}
              />
            </div>
          </div>
          {isUpdatingError && (
            <p className="text-red-500">
              Ошибка обновления: {updatingError?.message}
            </p>
          )}
          <DialogFooter>
            <Button onClick={onClose} disabled={isUpdating || isDeleting}>
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
            <Button type="submit" disabled={!isValid || isUpdating || isDeleting}>
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