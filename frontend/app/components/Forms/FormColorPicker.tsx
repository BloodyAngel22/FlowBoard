"use client";

import { Controller, FieldValues, Control, Path, FieldErrors } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { Label } from "../ui/label";
import { cn } from "@/app/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";

interface FormColorPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  errors?: FieldErrors<T>;
}

const presetColors = [
  "#D06F6F",
  "#E3A900",
  "#2D9B77",
  "#4688C1",
  "#8A6BCE",
  "#D1539A",
  "#E2B500",
  "#28A6D9",
  "#42BD5F", 
  "#8C8C8C", 
];

export default function FormColorPicker<T extends FieldValues>({
  control,
  name,
  label = "Цвет",
  errors,
}: FormColorPickerProps<T>) {
  return (
    <div className="w-full">
      {label && <Label className="mb-1.5 ml-0.5 block font-bold">{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div
                    className="h-5 w-5 rounded mr-2 border border-zinc-200 dark:border-zinc-800"
                    style={{ backgroundColor: field.value || "transparent" }}
                  />
                  {field.value || "Цвет не выбран"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4">
                <HexColorPicker
                  color={field.value || "#000000"}
                  onChange={(color) => field.onChange(color)}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {presetColors.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className="h-6 w-6 rounded border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                      style={{ backgroundColor: preset }}
                      onClick={() => field.onChange(preset)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {field.value && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => field.onChange(null)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <CircleX className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      />
      {errors?.[name] && (
        <p className="text-red-400 text-sm ml-2 mt-0.5">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}