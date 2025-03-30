export interface IColumnModifyRequest {
  name: string;
  position: number;
  isFinished: boolean;
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
}