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