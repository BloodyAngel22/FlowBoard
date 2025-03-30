export interface IKanbanTask {
  id: string;
  name: string;
  priority: number;
  position: number;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
}

export interface IKanbanTaskResponse {
  success: boolean;
  data: IKanbanTask;
}

export interface IKanbanTaskModifyResponse {
  success: boolean;
  data: string;
}

export interface IKanbanTaskModifyRequest {
  name: string;
  priority: number;
  position: number;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  categoryId?: string | null;
}