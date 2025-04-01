export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryResponse {
  success: boolean;
  data: ICategory;
}

export interface ICategoriesResponse {
  success: boolean;
  data: ICategory[];
}

export interface ICategoryModifyRequest {
  name: string;
}