import { useQuery } from "@tanstack/react-query"
import { IProjectFullResponse, IProjectResponse } from "../types/IProject"
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
  });
}