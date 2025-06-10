import { useForm } from "react-hook-form";
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
import { IColumnForm } from "@/app/types/IColumn.form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { columnValidator } from "@/app/validators/columnValidator";
import FormInput from "../Forms/FormInput";
import { useRef } from "react";
import FormCheckbox from "../Forms/FormCheckbox";
import { useProjectId } from "@/app/stores/useProjectId";
import { useCreateColumn } from "@/app/hooks/useColumns";
import { IColumnModifyRequest } from "@/app/types/IColumn";
import { Plus } from "lucide-react";
import FormColorPicker from "../Forms/FormColorPicker";

interface NewColumnButtonProps {
  lastColumnPosition: number;
}

export default function NewColumnButton({
  lastColumnPosition,
}: NewColumnButtonProps) {
  const { projectId } = useProjectId();
  const { mutate, isPending, isError, error } = useCreateColumn(projectId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IColumnForm>({
    mode: "onChange",
    resolver: yupResolver(columnValidator),
    defaultValues: {
      name: "test column",
      isFinished: false,
      color: null,
    },
  });

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleSubmitForm = (data: IColumnForm) => {
    console.log(data);

    if (isValid) {
      const newColumn: IColumnModifyRequest = {
        name: data.name,
        isFinished: data.isFinished,
        position: lastColumnPosition + 1,
        color: data.color || null,
      };

      mutate(newColumn, {
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
          <Button className="create-button">
            <Plus className="h-5 w-5" />
            <span>{isPending ? "Создание..." : "Добавить колонку"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sm:max-w-md">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <DialogHeader>
              <DialogTitle className="text-zinc-600 dark:text-zinc-100">
                Добавить колонку
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 mb-6 max-h-[400px] overflow-y-auto pr-4">
              <div className="flex w-full flex-col gap-4">
                <FormInput
                  register={register}
                  name="name"
                  label="Название колонки"
                  placeholder="Введите название колонки"
                  errors={errors}
                  isRequired
                />
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
            {isError && (
              <p className="ml-2 text-sm text-red-500 dark:text-red-400">
                {error?.message as string}
              </p>
            )}
            <DialogFooter className="justify-end">
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
