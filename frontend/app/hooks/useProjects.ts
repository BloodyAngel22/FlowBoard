import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IProjectFullResponse, IProjectModifyRequest, IProjectModifyResponse, IProjectResponse } from "../types/IProject"
import { projectsApiInstance } from "../api/projectsApi";

export const useProjects = () => {
  return useQuery<IProjectResponse, Error>({
    queryKey: ["projects"],
    queryFn: () => projectsApiInstance.getProjects(),
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

export const useProject = (id: string) => {
  return useQuery<IProjectFullResponse, Error>({
    queryKey: ["project", id],
    queryFn: () => projectsApiInstance.getProjectData(id),
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
    enabled: !!id
  });
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<IProjectModifyResponse, Error, IProjectModifyRequest>({
    mutationFn: (project: IProjectModifyRequest) =>
      projectsApiInstance.createProject(project),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<IProjectModifyResponse, Error, IProjectModifyRequest>({
    mutationFn: (project: IProjectModifyRequest) =>
      projectsApiInstance.updateProject(id, project),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["project", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export const useDeleteProject = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<IProjectModifyResponse, Error>({
    mutationFn: () =>
      projectsApiInstance.deleteProject(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    }
  })
}