export interface ITask {
  id: string;
  name: string;
  priority: number;
  position: number;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
}

export interface ITaskResponse {
  success: boolean;
  data: ITask;
}

export interface ITaskModifyResponse {
  success: boolean;
  data: string;
}

export interface ITaskModifyRequest {
  name: string;
  priority: number;
  position: number;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  categoryId?: string | null;
}

export interface ICardMoveRequest {
  taskId: string;
  fromPosition: number;
  fromColumnId: string;
  toPosition: number;
  toColumnId: string;
}

export interface ICardMoveResponse {
  success: boolean;
  data: string;
}