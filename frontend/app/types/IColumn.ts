import { ITask } from "./ITask";

export interface IColumn {
  id: string;
  name: string;
  position: number;
  isFinished: boolean;
  color?: string | null;
  tasks: ITask[];
}

export interface IColumnModifyRequest {
  name: string;
  position: number;
  isFinished: boolean;
  color?: string | null;
}

export interface IColumnModifyResponse {
  success: boolean;
  data: string;
}

export interface IColumnResponse {
  id: string;
  name: string;
  position: number;
  isFinished: boolean;
  color?: string | null;
}

export interface IColumnMoveRequest {
  columnId: string;
  fromPosition: number;
  toPosition: number;
}

export interface IColumnMoveResponse {
  success: boolean;
  data: string;
}