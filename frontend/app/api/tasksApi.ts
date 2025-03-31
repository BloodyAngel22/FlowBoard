import {
  IColumnModifyRequest,
  IColumnMoveRequest,
  IColumnMoveResponse,
} from "../types/IColumn";
import {
  ICardMoveRequest,
  IKanbanTaskModifyRequest,
  IKanbanTaskModifyResponse,
  IKanbanTaskResponse,
} from "../types/IKanbanTask";

class kanbanApi {
  private url = `https://localhost:7148/api/KanbanBoard`;

  public async getTask(
    projectId: string,
    listTaskId: string,
    kanbanTaskId: string
  ): Promise<IKanbanTaskResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${
          this.url
        }/${listTaskId}/kanbantasks/${kanbanTaskId}?${queryParams.toString()}`,
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
    listTaskId: string,
    kanbanTask: IKanbanTaskModifyRequest
  ): Promise<IKanbanTaskModifyResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/${listTaskId}/kanbantasks?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(kanbanTask),
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
    listTaskId: string,
    kanbanTaskId: string,
    kanbanTask: IKanbanTaskModifyRequest
  ): Promise<IKanbanTaskModifyResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${
          this.url
        }/${listTaskId}/kanbantasks/${kanbanTaskId}?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(kanbanTask),
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
    listTaskId: string,
    kanbanTaskId: string
  ) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${
          this.url
        }/${listTaskId}/kanbantasks/${kanbanTaskId}?${queryParams.toString()}`,
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
        `${this.url}/${columnId}?${queryParams.toString()}`,
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

      const response = await fetch(`${this.url}?${queryParams.toString()}`, {
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
        `${this.url}/${columnId}?${queryParams.toString()}`,
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
        `${this.url}/${columnId}?${queryParams.toString()}`,
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
  ): Promise<IKanbanTaskModifyResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("projectId", projectId);

      const response = await fetch(
        `${this.url}/kanbantasks/move?${queryParams.toString()}`,
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
        `${this.url}/listtasks/move?${queryParams.toString()}`,
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
