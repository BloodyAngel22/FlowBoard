"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectValidator } from "@/app/validators/projectValidator";
import { IProjectModifyRequest } from "@/app/types/IProject";
import FormInput from "@/app/components/Forms/FormInput";
import FormTextarea from "@/app/components/Forms/FormTextarea";
import { useCreateProject } from "@/app/hooks/useProjects";
import { Plus } from "lucide-react";

export default function NewProjectSection() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createProject, isPending } = useCreateProject();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IProjectModifyRequest>({
    mode: "onChange",
    resolver: yupResolver(projectValidator),
    defaultValues: {
      name: "test project",
      description: null,
    },
  });

  const handleCreateProject = (formData: IProjectModifyRequest) => {
    console.log("Form data:", formData);

    if (isValid) {
      createProject(formData, {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Failed to create project:", error);
        },
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="dark:bg-zinc-300 dark:hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Создать проект
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-zinc-800 bg-zinc-950">
          <form onSubmit={handleSubmit(handleCreateProject)}>
            <DialogHeader>
              <DialogTitle className="text-zinc-100">
                Создать новый проект
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 mb-6 max-h-[400px] overflow-y-auto pr-4">
              <div className="flex w-full flex-col gap-4">
                <FormInput
                  register={register}
                  name="name"
                  label="Название проекта"
                  placeholder="Введите название проекта"
                  errors={errors}
                  isRequired
                />
                <FormTextarea
                  register={register}
                  name="description"
                  label="Описание проекта"
                  placeholder="Введите описание проекта"
                  errors={errors}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="dark:bg-zinc-800 dark:hover:bg-zinc-900 transition-colors duration-200 cursor-pointer"
              >
                Отменить
              </Button>
              <Button
                className="dark:bg-zinc-300 dark:hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
                type="submit"
                disabled={!isValid || isPending}
              >
                {isPending ? "Создание..." : "Создать"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}