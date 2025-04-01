import { ICategory, ICategoriesResponse, ICategoryResponse, ICategoryModifyRequest } from "../types/ICategory";
import { IFormSelect } from "../types/IFormSelect";

class categoriesApi {
  private url = `https://localhost:7148/api/Category`;

  public async getCategories(): Promise<ICategoriesResponse> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getCategory(id: string): Promise<ICategoryResponse> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async createCategory(category: ICategoryModifyRequest) {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateCategory(id: string, category: ICategoryModifyRequest) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteCategory(id: string) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public transformToFormSelect(data: ICategory[]): IFormSelect[] {
    return data.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }
}

export const categoriesApiInstance = new categoriesApi();