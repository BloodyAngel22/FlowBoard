import { MyColumn } from "@/app/types/TKanban";

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
      className="bg-blue-500 text-white text-lg font-semibold p-3 rounded-t-md mr-4 w-52"
      onClick={() => { console.log(column); handleColumnClick(column) }}
    >
      {column.title}
      {column.metadata.isFinished ? " (Завершено)" : ""}
    </div>
  );
}