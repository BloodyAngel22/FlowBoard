import { IProjectFull } from "../types/IProject";
import { MyKanbanBoard } from "../types/TKanban";

export const transformToKanbanBoard = (data: IProjectFull): MyKanbanBoard => {
  if (!data?.columns || data.columns.length === 0) {
    return { columns: [] };
  }

  return {
    columns: data.columns.map((list) => ({
      id: list.id,
      title: list.name,
      metadata: {
        isFinished: list.isFinished,
        position: list.position,
      },
      cards: list.tasks.map((task) => ({
        id: task.id,
        title: task.name,
        description: task.description || "",
        metadata: {
          priority: task.priority,
          position: task.position,
          startDate: task.startDate,
          endDate: task.endDate,
          categoryId: task.categoryId,
          isFinished: list.isFinished,
        },
      })),
    })),
  };
};