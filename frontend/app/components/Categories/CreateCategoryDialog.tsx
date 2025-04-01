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
import { categoryValidator } from "@/app/validators/categoryValidator";
import { ICategoryModifyRequest } from "@/app/types/ICategory";
import FormInput from "@/app/components/Forms/FormInput";
import { useCreateCategory } from "@/app/hooks/useCategories";
import { Plus } from "lucide-react";

export default function CreateCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createCategory, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ICategoryModifyRequest>({
    mode: "onChange",
    resolver: yupResolver(categoryValidator),
    defaultValues: {
      name: "test category",
    },
  });

  const handleCreateCategory = (formData: ICategoryModifyRequest) => {
    if (isValid) {
      createCategory(formData, {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
        onError: (error) => {
          console.error("Failed to create category:", error);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Plus size={16} className="mr-2" />
          Добавить категорию
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <DialogHeader>
            <DialogTitle>Создать категорию</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <FormInput
              register={register}
              name="name"
              label="Название категории"
              placeholder="Введите название категории"
              errors={errors}
              isRequired
            />
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
  );
}