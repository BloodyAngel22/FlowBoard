import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICategoriesResponse,
  ICategoryModifyRequest,
  ICategoryResponse,
} from "../types/ICategory";
import { categoriesApiInstance } from "../api/categoriesApi";
import { useProjectId } from "../stores/useProjectId";

export const useCategories = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: () => categoriesApiInstance.getCategories(),
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
};

export const useCategory = (id: string) => {
  return useQuery<ICategoryResponse, Error>({
    queryKey: ["category", id],
    queryFn: () => categoriesApiInstance.getCategory(id),
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<ICategoryResponse, Error, ICategoryModifyRequest>({
    mutationFn: (category: ICategoryModifyRequest) =>
      categoriesApiInstance.createCategory(category),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  const { projectId } = useProjectId();

  return useMutation<ICategoryResponse, Error, ICategoryModifyRequest>({
    mutationFn: (category: ICategoryModifyRequest) =>
      categoriesApiInstance.updateCategory(id, category),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["category", id],
      })
      if (projectId) {
        queryClient.invalidateQueries({
          queryKey: ["project", projectId],
        });
      }
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ICategoryResponse, Error>({
    mutationFn: () => categoriesApiInstance.deleteCategory(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      // console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};