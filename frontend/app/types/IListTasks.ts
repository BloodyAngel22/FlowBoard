import { IKanbanTask } from "./IKanbanTask";

export interface IListTasks {
  id: string;
  name: string;
  position: number;
  isFinished: boolean;
  tasks: IKanbanTask[];
}