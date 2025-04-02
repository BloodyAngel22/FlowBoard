import { IColumn } from "./IColumn";

export interface IProjectResponse {
  success: boolean;
  data: IProject[];
}

export interface IProjectFullResponse {
  success: boolean;
  data: IProjectFull;
}

export interface IProject {
  id: string;
  name: string;
  description?: string;
}

export interface IProjectModifyRequest {
  name: string;
  description?: string | null;
}

export interface IProjectModifyResponse {
  success: boolean;
  data: IProject;
}

export interface IProjectFull {
  id: string;
  name: string;
  description?: string;
  columns: IColumn[];
}