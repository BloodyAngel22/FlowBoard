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
import { ICategoryModifyRequest, ICategory } from "@/app/types/ICategory";
import FormInput from "@/app/components/Forms/FormInput";
import { useUpdateCategory } from "@/app/hooks/useCategories";
import { Pencil } from "lucide-react";

interface EditCategoryDialogProps {
  category: ICategory;
}

export default function EditCategoryDialog({ category }: EditCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateCategory, isPending } = useUpdateCategory(category.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ICategoryModifyRequest>({
    mode: "onChange",
    resolver: yupResolver(categoryValidator),
    defaultValues: {
      name: category.name,
    },
  });

  const handleUpdateCategory = (formData: ICategoryModifyRequest) => {
    if (isValid) {
      updateCategory(formData, {
        onSuccess: () => {
          setIsOpen(false);
          reset(formData);
        },
        onError: (error) => {
          console.error("Failed to update category:", error);
        },
      });
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      reset({ name: category.name }); 
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Pencil size={16} className="mr-2" />
          Изменить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
          <DialogHeader>
            <DialogTitle>Изменить категорию</DialogTitle>
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
              className="close-button"
            >
              Отменить
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="save-button"
            >
              {isPending ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}