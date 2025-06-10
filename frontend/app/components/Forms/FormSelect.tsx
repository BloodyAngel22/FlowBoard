import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { twMerge } from "tailwind-merge";
import { FieldErrors, FieldValues, Path, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { IFormSelect } from "../../types/IFormSelect";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  options: IFormSelect[];
  errors: FieldErrors<T>;
  isRequired?: boolean;
  allowClear?: boolean;
}

export default function FormSelect<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  options,
  errors,
  isRequired = false,
  allowClear = false,
}: FormSelectProps<T>) {
  const firstRealOption = options[0];
  const expectedType = firstRealOption
    ? typeof firstRealOption.value
    : "string";

  return (
    <div className="w-full">
      <Label className="ml-0.5 mb-2 flex gap-0 font-bold">
        {label}
        {isRequired && <span className="text-red-400">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) => {
                if (value !== "") {
                  field.onChange(
                    expectedType === "number" ? Number(value) : value
                  );
                }
              }}
              value={
                field.value !== undefined && field.value !== null
                  ? String(field.value)
                  : ""
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.icon && (
                      <option.icon className={twMerge(option.styles, "mr-2")} />
                    )}
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {allowClear &&
              field.value !== undefined &&
              field.value !== null && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6"
                  onClick={() => {
                    field.onChange(undefined);
                  }}
                >
                  <CircleX className="h-4 w-4" />
                </Button>
              )}
          </div>
        )}
      />
      {errors[name] && (
        <p className="text-red-400 text-sm ml-2 mb-1 mt-0.5">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
