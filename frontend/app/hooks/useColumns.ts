import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IColumnModifyRequest, IColumnModifyResponse } from "../types/IColumn";
import { tasksApiInstance } from "../api/tasksApi";

export const useColumn = (projectId: string, columnId: string) => {
  return useQuery({
    queryKey: ["column", projectId, columnId],
    queryFn: () => tasksApiInstance.getColumn(projectId, columnId),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!projectId && !!columnId
  })
}

export const useCreateColumn = (projectId: string) => {
  const queryClient = useQueryClient(); 

  return useMutation<IColumnModifyResponse, Error, IColumnModifyRequest>({
    mutationFn: (column: IColumnModifyRequest) =>
      tasksApiInstance.createColumn(projectId, column),
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
}

export const useUpdateColumn = (projectId: string, columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation<IColumnModifyResponse, Error, IColumnModifyRequest>({
    mutationFn: (column: IColumnModifyRequest) =>
      tasksApiInstance.updateColumn(projectId, columnId, column),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["column", projectId, columnId],
      })
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export const useDeleteColumn = (projectId: string, columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation<IColumnModifyResponse, Error>({
    mutationFn: () =>
      tasksApiInstance.deleteColumn(projectId, columnId),
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