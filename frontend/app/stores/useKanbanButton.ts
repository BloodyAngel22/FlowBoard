import { create } from "zustand";

interface KanbanButton {
  newTaskButton: {
    listTaskId: string;
    position: number;
    disabled: boolean;
  };
  newColumnButton: {
    lastColumnPosition: number;
  };
  setNewTaskButton: (
    listTaskId: string,
    position: number,
    disabled: boolean
  ) => void;
  setNewColumnButton: (lastColumnPosition: number) => void;
}

export const useKanbanButton = create<KanbanButton>((set) => ({
  newTaskButton: {
    listTaskId: "",
    position: -1,
    disabled: true,
  },
  newColumnButton: {
    lastColumnPosition: 0,
  },
  setNewTaskButton: (
    listTaskId: string,
    position: number,
    disabled: boolean
  ) => {
    set({
      newTaskButton: {
        listTaskId: listTaskId,
        position: position,
        disabled: disabled,
      },
    });
  },
  setNewColumnButton: (lastColumnPosition: number) => {
    set({
      newColumnButton: {
        lastColumnPosition: lastColumnPosition,
      },
    });
  },
}));
