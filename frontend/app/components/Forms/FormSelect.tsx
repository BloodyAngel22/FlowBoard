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
  const CLEAR_VALUE = "__none__";

  const selectOptions =
    allowClear && !isRequired
      ? [{ value: CLEAR_VALUE, label: "Не выбрано" }, ...options]
      : options;

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
          <Select
            onValueChange={(value) => {
              if (value === CLEAR_VALUE && allowClear) {
                field.onChange(undefined);
              } else if (value !== "") {
                field.onChange(
                  expectedType === "number" ? Number(value) : value
                );
              }
            }}
            value={
              field.value === null || field.value === undefined
                ? CLEAR_VALUE
                : String(field.value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((option) => (
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
