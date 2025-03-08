import { IListTasks } from "./IListTasks";

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

export interface IProjectFull {
  id: string;
  name: string;
  description?: string;
  listTasks: IListTasks[];
}