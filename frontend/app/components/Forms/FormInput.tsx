import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FormInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  errors: FieldErrors<T>;
  isRequired?: boolean;
  withoutStyle?: boolean;
}

export default function FormInput<T extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  errors,
  isRequired = false,
  withoutStyle = false,
}: FormInputProps<T>) {
  return (
    <>
      <div className="w-full">
        {label && (
          <Label className="ml-0.5 flex gap-0">
            {label}
            {isRequired && <span className="text-red-400">*</span>}
          </Label>
        )}
        {withoutStyle ? (
          <input
            type="text"
            className={twMerge(
              "bg-transparent duration-300 pl-2 m-0 -ml-2 inline-block min-w-0 hover:bg-zinc-800/80 focus:bg-transparent rounded-md"
            )}
            {...register(name)}
            placeholder={placeholder}
          />
        ) : (
          <Input
            placeholder={placeholder}
            {...register(name)}
            className={`w-full mt-1`}
          />
        )}
        {errors[name] && (
          <p className="text-red-400 text-sm ml-2 mb-1 mt-0.5">
            {errors[name].message as string}
          </p>
        )}
      </div>
    </>
  );
}
