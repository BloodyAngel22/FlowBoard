import { useProjects } from "@/app/hooks/useProjects";
import { DataTable } from "./DataTable";
import { columns } from "./tableColumns";

export default function ProjectsTable() {
  const { data, isSuccess, isLoading, isError, error } = useProjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <div className="p-2">
        {isSuccess && <DataTable columns={columns} data={data.data} />}
      </div>
    </>
  );
}