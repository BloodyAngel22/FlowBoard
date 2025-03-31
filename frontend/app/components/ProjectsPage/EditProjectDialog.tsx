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
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
          <Pencil size={16} className="mr-0.5" />
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleUpdateProject)}>
          <DialogHeader>
            <DialogTitle>Изменить данные проекта</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto mt-8 mb-8 pr-4">
            <div className="flex flex-col gap-3 justify-start items-start space-x-2 w-full">
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
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogClose(false)}
              disabled={isPending}
            >
              Отменить
            </Button>
            <Button type="submit" disabled={!isValid || isPending}>
              {isPending ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}