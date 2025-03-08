"use client";

import KanbanSection from "@/app/components/Kanban/KanbanSectionT";
import { useProject } from "@/app/hooks/useProjects";

import { use } from "react";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

export default function Project({ params }: ProjectProps) {
  const resolvedParams = use(params);
  const { data, isSuccess, isLoading, isError, error } = useProject(
    resolvedParams.id
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      {/* {isSuccess && <pre>{JSON.stringify(data.data, null, 2)}</pre>} */}
      {isSuccess && <KanbanSection boardData={data.data} />}
    </>
  );
}
