export interface ITaskForm {
  name: string;
  priority: number;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  categoryId?: string;
}