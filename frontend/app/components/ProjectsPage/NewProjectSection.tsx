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
          <Button onClick={() => setIsOpen(true)}>Создать новый проект</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(handleCreateProject)}>
            <DialogHeader>
              <DialogTitle>Создать новый проект</DialogTitle>
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
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Отменить
              </Button>
              <Button type="submit" disabled={!isValid || isPending}>
                {isPending ? "Создание..." : "Создать"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}