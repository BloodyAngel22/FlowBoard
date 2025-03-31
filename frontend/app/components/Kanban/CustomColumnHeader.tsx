import { MyColumn } from "@/app/types/TKanban";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Check } from "lucide-react";

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
      className="flex w-62 cursor-pointer items-center justify-between rounded-t-md bg-zinc-800 p-3 text-lg font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
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
            <TooltipContent className="w-64 text-center dark:bg-zinc-200">
              Задачи, перемещенные в этот столбец, помечаются как выполненные
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}