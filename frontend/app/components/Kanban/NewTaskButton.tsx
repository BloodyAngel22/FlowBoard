import { ITaskForm } from "@/app/types/ITask.form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskValidator } from "@/app/validators/taskValidator";
import { useRef } from "react";
import FormInput from "../Forms/FormInput";
import { priorities } from "@/app/data/priority";
import FormSelect from "../Forms/FormSelect";
import FormTextarea from "../Forms/FormTextarea";
import FormDatePicker from "../Forms/FormDatePicker";
import { useCategories } from "@/app/hooks/useCategories";
import { categoriesApiInstance } from "@/app/api/categoriesApi";
import { useProjectId } from "@/app/stores/useProjectId";
import { useCreateTask } from "@/app/hooks/useTasks";
import { IKanbanTaskModifyRequest } from "@/app/types/IKanbanTask";

interface NewTaskButtonProps {
  listTaskId: string;
  position: number;
  disabled: boolean;
}

export default function NewTaskButton({
  listTaskId,
  position,
  disabled,
}: NewTaskButtonProps) {
  const { projectId } = useProjectId();
  const { mutate, isPending, isError, error } = useCreateTask(
    projectId,
    listTaskId
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ITaskForm>({
    mode: "onChange",
    resolver: yupResolver(taskValidator),
    defaultValues: {
      name: "test task",
      priority: 2,
      description: undefined,
      categoryId: undefined,
    },
  });

  const { data, isSuccess } = useCategories();

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleSubmitForm = (formData: ITaskForm) => {
    // console.log(data);

    // console.log(newTask);

    if (isValid) {
      const newTask: IKanbanTaskModifyRequest = {
        name: formData.name,
        priority: formData.priority,
        position: position + 1,
        description: formData?.description || null,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        categoryId: formData.categoryId || null,
      };

      mutate(newTask, {
        onSuccess: () => {
          dialogCloseRef.current?.click();
        },
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={disabled}>Добавить задачу</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <DialogHeader>
              <DialogTitle>Добавить задачу</DialogTitle>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto mt-8 mb-8 pr-4">
              <div className="flex flex-col gap-3 justify-start items-start space-x-2 w-full">
                <FormInput
                  register={register}
                  name="name"
                  label="Название задачи"
                  placeholder="Введите название задачи"
                  errors={errors}
                  isRequired
                />
                <FormTextarea
                  register={register}
                  name="description"
                  label="Описание задачи"
                  placeholder="Введите описание задачи"
                  errors={errors}
                />
                <FormSelect
                  isRequired
                  control={control}
                  name="priority"
                  label="Приоритет"
                  placeholder="Выберите приоритет"
                  options={priorities}
                  errors={errors}
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
                {isSuccess && data.data && (
                  <FormSelect
                    control={control}
                    name="categoryId"
                    label="Категория"
                    placeholder="Выберите категорию"
                    errors={errors}
                    options={categoriesApiInstance.transformToFormSelect(
                      data.data
                    )}
                    allowClear
                  />
                )}
              </div>
            </div>
            {isError && (
              <p className="text-red-400 text-sm ml-2">
                {error?.message as string}
              </p>
            )}
            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary" ref={dialogCloseRef}>
                  Закрыть
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!isValid || isPending}>
                {isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
