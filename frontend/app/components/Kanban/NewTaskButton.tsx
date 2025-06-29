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
import { ITaskModifyRequest } from "@/app/types/ITask";
import { Plus } from "lucide-react";

interface NewTaskButtonProps {
  columnId: string;
  position: number;
  disabled: boolean;
}

export default function NewTaskButton({
  columnId,
  position,
  disabled,
}: NewTaskButtonProps) {
  const { projectId } = useProjectId();
  const { mutate, isPending, isError, error } = useCreateTask(
    projectId,
    columnId
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
      const newTask: ITaskModifyRequest = {
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
          <Button disabled={disabled} className="create-button">
            <Plus className="h-5 w-5" />
            <span>{isPending ? "Создание..." : "Добавить задачу"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sm:max-w-md">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <DialogHeader>
              <DialogTitle className="text-zinc-600 dark:text-zinc-100">
                Добавить задачу
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 mb-6 max-h-[400px] overflow-y-auto pr-4">
              <div className="flex w-full flex-col gap-4">
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
              <p className="ml-2 text-sm text-red-500 dark:text-red-400">
                {error?.message as string}
              </p>
            )}
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary" ref={dialogCloseRef} className="close-button">
                  Закрыть
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!isValid || isPending} className="save-button">
                {isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
