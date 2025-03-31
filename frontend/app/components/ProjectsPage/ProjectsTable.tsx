import { useProjects } from "@/app/hooks/useProjects";
import { DataTable } from "./DataTable";
import { columns } from "./tableColumns";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function ProjectsTable() {
  const { data, isSuccess, isLoading, isError, error } = useProjects();

  if (isLoading) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500 dark:text-zinc-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        variant="destructive"
        className="mx-auto my-4 max-w-2xl border-red-600 bg-red-50 dark:border-red-900 dark:bg-red-950/50"
      >
        <AlertTitle className="text-red-800 dark:text-red-300">
          Ошибка загрузки проектов
        </AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-400">
          {error?.message ||
            "Произошла ошибка при загрузке проектов. Пожалуйста, попробуйте позже."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        {isSuccess && <DataTable columns={columns} data={data.data} />}
      </div>
    </>
  );
}