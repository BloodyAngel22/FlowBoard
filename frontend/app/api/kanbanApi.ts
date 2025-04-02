import {
  IColumnModifyRequest,
  IColumnMoveRequest,
  IColumnMoveResponse,
} from "../types/IColumn";
import {
  ICardMoveRequest,
  ITaskModifyRequest,
  ITaskModifyResponse,
  ITaskResponse,
} from "@/app/types/ITask";

class kanbanApi {
  private url = `https://localhost:7148/api/KanbanBoard`;

  public async getTask(
    projectId: string,
    columnId: string,
    taskId: string
  ): Promise<ITaskResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${
          this.url
        }/columns/${columnId}/tasks/${taskId}?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  public async createTask(
    projectId: string,
    columnId: string,
    task: ITaskModifyRequest
  ): Promise<ITaskModifyResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/columns/${columnId}/tasks?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

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

  public async updateTask(
    projectId: string,
    columnId: string,
    taskId: string,
    task: ITaskModifyRequest
  ): Promise<ITaskModifyResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${
          this.url
        }/columns/${columnId}/tasks/${taskId}?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

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

  public async deleteTask(
    projectId: string,
    columnId: string,
    taskId: string
  ) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${
          this.url
        }/columns/${columnId}/tasks/${taskId}?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  public async getColumn(projectId: string, columnId: string) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/columns/${columnId}?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  public async createColumn(projectId: string, column: IColumnModifyRequest) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(`${this.url}/columns?${queryParams.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(column),
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

  public async updateColumn(
    projectId: string,
    columnId: string,
    column: IColumnModifyRequest
  ) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/columns/${columnId}?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(column),
        }
      );

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

  public async deleteColumn(projectId: string, columnId: string) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/columns/${columnId}?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  public async moveTask(
    projectId: string,
    moveTask: ICardMoveRequest
  ): Promise<ITaskModifyResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/tasks/move?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(moveTask),
        }
      );

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

  public async moveColumn(
    projectId: string,
    moveColumn: IColumnMoveRequest
  ): Promise<IColumnMoveResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/columns/move?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(moveColumn),
        }
      );

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

export const tasksApiInstance = new kanbanApi();
