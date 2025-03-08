import { IProject } from "@/app/types/IProject";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue() ?? "empty",
  },
  {
    header: "Actions",
    cell: (info) => {
      const projectId = info.row.original.id;
      return (
        <div className="flex gap-2">
          <Link
            href={`/projects/${projectId}`}
            className="flex gap-1 items-center text-blue-500 hover:text-blue-600 transition-colors dark:text-blue-400 dark:hover:text-blue-500 duration-300"
          >
            Open
            <ExternalLink size={20} />
          </Link>
        </div>
      );
    },
  },
];
