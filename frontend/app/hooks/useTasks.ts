import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICardMoveRequest,
  ICardMoveResponse,
  ITaskModifyRequest,
  ITaskModifyResponse,
  ITaskResponse,
} from "../types/ITask";
import { tasksApiInstance } from "../api/kanbanApi";

export const useTask = (
  projectId: string,
  columnId: string,
  taskId: string
) => {
  return useQuery<ITaskResponse, Error>({
    queryKey: ["task", projectId, columnId, taskId],
    queryFn: () =>
      tasksApiInstance.getTask(projectId, columnId, taskId),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!projectId && !!columnId && !!taskId,
    retry: 1,
  });
};

export const useCreateTask = (projectId: string, columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ITaskModifyResponse, Error, ITaskModifyRequest>({
    mutationFn: (task: ITaskModifyRequest) =>
      tasksApiInstance.createTask(projectId, columnId, task),
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

export const useUpdateTask = (projectId: string, columnId: string, taskId: string) => {
  const queryClient = useQueryClient();

  if (!columnId || !taskId) {
    console.error("columnId or taskId is missing:", { columnId, taskId });
  }

  return useMutation<ITaskModifyResponse, Error, ITaskModifyRequest>({
    mutationFn: (task: ITaskModifyRequest) =>
      tasksApiInstance.updateTask(projectId, columnId, taskId, task),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["task", projectId, columnId, taskId],
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

export const useDeleteTask = (projectId: string, columnId: string, taskId: string) => {
  const queryClient = useQueryClient();

  if (!projectId || !columnId || !taskId) {
    console.error("projectId, columnId or taskId is missing:", { projectId, columnId, taskId });
  }

  return useMutation<ITaskModifyResponse, Error>({
    mutationFn: () =>
      tasksApiInstance.deleteTask(projectId, columnId, taskId),
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

export const useMoveTask = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ICardMoveResponse, Error, ICardMoveRequest>({
    mutationFn: (cardMove: ICardMoveRequest) => {
      if (!cardMove.fromColumnId || !cardMove.toColumnId) {
        console.error("fromColumnId or toColumnId is missing:", { cardMove });
        throw new Error("fromColumnId or toColumnId is missing");
      }
      return tasksApiInstance.moveTask(projectId, cardMove)
    },
    onSuccess: (response) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["project", projectId],
      // });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};