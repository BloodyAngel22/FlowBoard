"use client";

import KanbanSection from "@/app/components/Kanban/KanbanSection";
import { useProject } from "@/app/hooks/useProjects";
import { useProjectId } from "@/app/stores/useProjectId";

import { use, useEffect } from "react";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

export default function Project({ params }: ProjectProps) {
  const resolvedParams = use(params);
  const { setProjectId } = useProjectId();
  const { data, isSuccess, isLoading, isError, error } = useProject(
    resolvedParams.id
  );

  useEffect(() => {
    setProjectId(resolvedParams.id);
  }, [resolvedParams.id, setProjectId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      {isSuccess && <KanbanSection boardData={data.data} />}
    </>
  );
}
