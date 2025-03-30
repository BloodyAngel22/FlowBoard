import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IKanbanTaskModifyRequest,
  IKanbanTaskModifyResponse,
  IKanbanTaskResponse,
} from "../types/IKanbanTask";
import { tasksApiInstance } from "../api/tasksApi";

export const useTask = (
  projectId: string,
  listTaskId: string,
  kanbanTaskId: string
) => {
  return useQuery<IKanbanTaskResponse, Error>({
    queryKey: ["task", projectId, listTaskId, kanbanTaskId],
    queryFn: () =>
      tasksApiInstance.getTask(projectId, listTaskId, kanbanTaskId),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!projectId && !!listTaskId && !!kanbanTaskId,
    retry: 1,
  });
};

export const useCreateTask = (projectId: string, listTaskId: string) => {
  const queryClient = useQueryClient();

  return useMutation<IKanbanTaskModifyResponse, Error, IKanbanTaskModifyRequest>({
    mutationFn: (kanbanTask: IKanbanTaskModifyRequest) =>
      tasksApiInstance.createTask(projectId, listTaskId, kanbanTask),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUpdateTask = (projectId: string, listTaskId: string, kanbanTaskId: string) => {
  const queryClient = useQueryClient();

  if (!listTaskId || !kanbanTaskId) {
    console.error("listTaskId or kanbanTaskId is missing:", { listTaskId, kanbanTaskId });
  }

  return useMutation<IKanbanTaskModifyResponse, Error, IKanbanTaskModifyRequest>({
    mutationFn: (kanbanTask: IKanbanTaskModifyRequest) =>
      tasksApiInstance.updateTask(projectId, listTaskId, kanbanTaskId, kanbanTask),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["task", projectId, listTaskId, kanbanTaskId],
      })
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDeleteTask = (projectId: string, listTaskId: string, kanbanTaskId: string) => {
  const queryClient = useQueryClient();

  if (!projectId || !listTaskId || !kanbanTaskId) {
    console.error("projectId, listTaskId or kanbanTaskId is missing:", { projectId, listTaskId, kanbanTaskId });
  }

  return useMutation<IKanbanTaskModifyResponse, Error>({
    mutationFn: () =>
      tasksApiInstance.deleteTask(projectId, listTaskId, kanbanTaskId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    }
  })
}