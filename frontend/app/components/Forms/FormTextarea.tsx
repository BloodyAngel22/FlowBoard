import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { twMerge } from "tailwind-merge";

interface FormTextareaProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  errors: FieldErrors<T>;
  withoutStyle?: boolean;
}

export default function FormTextarea<T extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  errors,
  withoutStyle = false,
}: FormTextareaProps<T>) {
  return (
    <>
      <div className="w-full">
        <Label className="ml-0.5 font-bold">{label}</Label>
        {withoutStyle ? (
          <textarea
            {...register(name)}
            placeholder={placeholder}
            className={twMerge(
              `w-full mt-1 bg-transparent hover:bg-zinc-800/80 focus:bg-transparent rounded-md pl-2 pt-0.5`
            )}
          />
        ) : (
          <Textarea
            placeholder={placeholder}
            {...register(name)}
            className="w-full mt-1"
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
