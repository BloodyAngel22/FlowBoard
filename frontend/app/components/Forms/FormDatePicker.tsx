import {
  Controller,
  FieldValues,
  Control,
  Path,
} from "react-hook-form";
import { format } from "date-fns"; // Для форматирования даты
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/app/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export default function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label = "Дата",
  placeholder = "Выберите дату",
}: FormDatePickerProps<T>) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 ml-0.5 block font-bold">{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP") 
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setHours(0, 0, 0, 0);
                    field.onChange(newDate);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
}
