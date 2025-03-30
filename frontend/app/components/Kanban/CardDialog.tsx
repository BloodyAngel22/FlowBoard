"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useProjectId } from "@/app/stores/useProjectId";
import { priorities } from "@/app/data/priority";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskValidator } from "@/app/validators/taskValidator";
import { ITaskForm } from "@/app/types/ITask.form";
import { useEffect, useRef } from "react";
import FormTextarea from "../Forms/FormTextarea";
import FormSelect from "../Forms/FormSelect";
import FormDatePicker from "../Forms/FormDatePicker";
import { useCategories } from "@/app/hooks/useCategories";
import { categoriesApiInstance } from "@/app/api/categoriesApi";
import FormInput from "../Forms/FormInput";
import { useDeleteTask, useTask, useUpdateTask } from "@/app/hooks/useTasks";
import { IKanbanTaskModifyRequest, IKanbanTaskModifyResponse } from "@/app/types/IKanbanTask";
import AlertDelete from "./AlertDelete";

interface CardDialogProps {
  cardId: string | undefined;
  columnId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

function CardDialogContent({ projectId, cardId, columnId, onClose }: { projectId: string; cardId: string; columnId: string; onClose: () => void }) {
  const { data, isSuccess, isLoading, isError, error } = useTask(projectId, columnId, cardId);
  const { mutate, isPending: isUpdating, isError: isUpdatingError, error: updatingError } = useUpdateTask(projectId, columnId, cardId);
  const { mutate: deleteTask, isPending: isDeleting, isError: isDeletingError, error: deletingError } = useDeleteTask(projectId, columnId, cardId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ITaskForm>({
    mode: "onChange",
    resolver: yupResolver(taskValidator),
  });

  const { data: categoriesData, isSuccess: categoriesIsSuccess } = useCategories();

  useEffect(() => {
    if (isSuccess && data?.data) {
      reset({
        ...data.data,
        name: data.data.name || "",
        description: data.data.description || "",
        priority: data.data.priority !== null && !isNaN(data.data.priority) ? data.data.priority : 1,
        startDate: data.data.startDate ? new Date(data.data.startDate) : null,
        endDate: data.data.endDate ? new Date(data.data.endDate) : null,
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

  const handleSubmitForm = (formData: ITaskForm) => {
    console.log("Form data:", formData);

    if (isValid && data?.data) {
      const updatedTask: IKanbanTaskModifyRequest = {
        name: formData.name,
        priority: formData.priority,
        position: data.data.position,
        description: formData.description || null,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        categoryId: formData.categoryId || null,
      };

      mutate(updatedTask, {
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
          <div className="h-[300px] w-full overflow-y-auto mt-4 mb-8 pr-4">
            <div className="flex flex-col gap-3 justify-start items-start space-x-2 w-full">
              <FormTextarea
                register={register}
                name="description"
                placeholder="Введите описание"
                label="Описание"
                errors={errors}
                withoutStyle
              />
              <FormSelect
                control={control}
                placeholder="Выберите приоритет"
                name="priority"
                label="Приоритет"
                errors={errors}
                options={priorities}
              />
              <FormDatePicker
                control={control}
                name="startDate"
                label="Дата начала"
              />
              <FormDatePicker
                control={control}
                name="endDate"
                label="Дата окончания"
              />
              {categoriesIsSuccess && categoriesData?.data && (
                <FormSelect
                  control={control}
                  placeholder="Выберите категорию"
                  name="categoryId"
                  label="Категория"
                  errors={errors}
                  options={categoriesApiInstance.transformToFormSelect(
                    categoriesData.data
                  )}
                  allowClear
                />
              )}
            </div>
          </div>
          {isUpdatingError && (
            <p className="text-red-500">
              Ошибка обновления: {updatingError?.message}
            </p>
          )}
          <DialogFooter>
            <Button onClick={onClose} disabled={isUpdating}>
              Закрыть
            </Button>
            <AlertDelete
              title="Вы точно хотите удалить задачу?"
              description="Это действие нельзя будем отменить после. Это удалит вашу задачу и информацию о ней."
              mutation={deleteTask}
              isPending={isDeleting}
              isError={isDeletingError}
              error={deletingError}
              onSuccess={onClose}
            />
            <Button type="submit" disabled={!isValid || isUpdating}>
              {isUpdating ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    );
  }

  return null;
}

export default function CardDialog({ cardId, columnId, isOpen, onClose }: CardDialogProps) {
  const { projectId } = useProjectId();

  if (!isOpen || !projectId || !cardId || !columnId) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <CardDialogContent projectId={projectId} cardId={cardId} columnId={columnId} onClose={onClose} />
    </Dialog>
  );
}