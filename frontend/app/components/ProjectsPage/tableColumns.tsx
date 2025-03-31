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
        <div className="flex gap-2 w-max">
          <Link
            href={`/projects/${project.id}`}
            className="flex gap-1 items-center text-blue-500 hover:text-blue-600 transition-colors dark:text-blue-400 dark:hover:text-blue-500 duration-300"
          >
            Перейти
            <ExternalLink size={20} />
          </Link>
          <EditProjectDialog project={project} />
          <DeleteProjectAlert projectId={project.id} />
        </div>
      );
    },
  },
];
