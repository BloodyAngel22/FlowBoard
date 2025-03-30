import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label"; 

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
}

export default function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  errors,
}: FormCheckboxProps<T>) {
  return (
    <div className="w-full flex items-center gap-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)} 
          />
        )}
      />
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
      {errors[name] && (
        <p className="text-red-400 text-sm ml-2">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}