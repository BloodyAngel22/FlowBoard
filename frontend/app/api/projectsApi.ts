import { IProject, IProjectFullResponse, IProjectResponse } from "../types/IProject";

class projectsApi {
  private url = `https://localhost:7148/api/KanbanProjects`;

  public async getProjects(): Promise<IProjectResponse> {
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

  public async getProjectData(id: string): Promise<IProjectFullResponse> {
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
}

export const projectsApiInstance = new projectsApi();