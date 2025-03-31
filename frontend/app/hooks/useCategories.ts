import { useQuery } from "@tanstack/react-query"
import { ICategoriesResponse, ICategoryResponse } from "../types/ICategory"
import { categoriesApiInstance } from "../api/categoriesApi"

export const useCategories = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ["categories"],
    queryFn: () => categoriesApiInstance.getCategories(),
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  })
}

export const useCategory = (id: string) => {
  return useQuery<ICategoryResponse, Error>({
    queryKey: ["category", id],
    queryFn: () => categoriesApiInstance.getCategory(id),
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  })
}

// TODO: добавить остальной crud для категорий. Так же добавить интерфейс для взаимодействия с категориями