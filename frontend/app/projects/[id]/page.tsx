"use client";

import KanbanSection from "@/app/components/Kanban/KanbanSection";
import { useProject } from "@/app/hooks/useProjects";
import { useProjectId } from "@/app/stores/useProjectId";
import { use, useEffect } from "react";
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import KanbanHeader from "@/app/components/Kanban/KanbanHeader";

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
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-zinc-500 dark:text-zinc-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mx-auto my-8 max-w-2xl border-red-600 bg-red-50 dark:border-red-900 dark:bg-red-950/50">
        <AlertTitle className="text-red-800 dark:text-red-300">Ошибка загрузки проекта</AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-400">
          {error?.message || "Произошла ошибка при загрузке проекта. Пожалуйста, попробуйте позже."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <KanbanHeader />
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          {data?.data?.name || "Проект"}
        </h1>
        {isSuccess && <KanbanSection boardData={data.data} />}
      </div>
    </>
  );
}
