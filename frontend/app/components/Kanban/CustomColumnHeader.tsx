import { MyColumn } from "@/app/types/TKanban";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface CustomColumnHeaderProps {
  column: MyColumn;
  handleColumnClick: (column: MyColumn) => void;
}

export default function CustomColumnHeader({
  column,
  handleColumnClick,
}: CustomColumnHeaderProps) {
  return (
    <div
      className={twMerge(
        "flex w-62 cursor-pointer items-center justify-between rounded-t-md p-3 text-lg font-semibold text-white transition-colors",
        column.metadata.color
          ? "column-hover"
          : "dark:bg-zinc-700 dark:hover:bg-zinc-600 bg-zinc-800 hover:bg-zinc-700 "
      )}
      style={{ backgroundColor: column.metadata.color || "" }}
      onClick={() => {
        console.log(column);
        handleColumnClick(column);
      }}
    >
      <span className="truncate">{column.title}</span>
      {column.metadata.isFinished && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Check className="font-semibold text-green-600" size={16} />
            </TooltipTrigger>
            <TooltipContent className="w-64 text-center dark:bg-zinc-300">
              Задачи, перемещенные в этот столбец, помечаются как выполненные
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}