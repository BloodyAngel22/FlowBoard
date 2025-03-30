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
          <Button>Добавить колонку</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <DialogHeader>
              <DialogTitle>Добавить колонку</DialogTitle>
            </DialogHeader>
            <div className="h-[150px] overflow-y-auto mt-8 mb-8 pr-4">
              <div className="flex flex-col gap-3 justify-start items-start space-x-2 w-full">
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
              </div>
            </div>
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
