import { IProject } from "@/app/types/IProject";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import EditProjectDialog from "./EditProjectDialog";
import DeleteProjectAlert from "./DeleteProjectAlert";

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
      const project = info.row.original;
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <span>Перейти</span>
            <ExternalLink size={18} />
          </Link>
          <EditProjectDialog project={project} />
          <DeleteProjectAlert projectId={project.id} />
        </div>
      );
    },
  },
];
