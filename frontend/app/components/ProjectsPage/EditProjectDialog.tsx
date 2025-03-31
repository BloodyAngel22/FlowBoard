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
import { IProject, IProjectModifyRequest } from "@/app/types/IProject";
import FormInput from "@/app/components/Forms/FormInput";
import FormTextarea from "@/app/components/Forms/FormTextarea";
import { useUpdateProject } from "@/app/hooks/useProjects";
import { Pencil } from "lucide-react";

interface EditProjectDialogProps {
  project: IProject; 
}

export default function EditProjectDialog({ project }: EditProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateProject, isPending } = useUpdateProject(project.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IProjectModifyRequest>({
    mode: "onChange",
    resolver: yupResolver(projectValidator),
    defaultValues: {
      name: project.name,
      description: project.description || null,
    },
  });

  const handleUpdateProject = (formData: IProjectModifyRequest) => {
    if (isValid) {
      updateProject(formData, {
        onSuccess: () => {
          setIsOpen(false);
          reset(formData);
        },
        onError: (error) => {
          console.error("Failed to update project:", error);
        },
      });
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      reset(project);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Pencil size={16} className="mr-0.5" />
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <form onSubmit={handleSubmit(handleUpdateProject)}>
          <DialogHeader>
            <DialogTitle className="text-zinc-800 dark:text-zinc-100">
              Изменить данные проекта
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
              onClick={() => handleDialogClose(false)}
              disabled={isPending}
              className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Отменить
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-300 dark:hover:bg-zinc-100"
            >
              {isPending ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}