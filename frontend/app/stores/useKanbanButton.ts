import { create } from "zustand";

interface KanbanButton {
  newTaskButton: {
    columnId: string;
    position: number;
    disabled: boolean;
  };
  newColumnButton: {
    lastColumnPosition: number;
  };
  setNewTaskButton: (
    columnId: string,
    position: number,
    disabled: boolean
  ) => void;
  setNewColumnButton: (lastColumnPosition: number) => void;
}

export const useKanbanButton = create<KanbanButton>((set) => ({
  newTaskButton: {
    columnId: "",
    position: -1,
    disabled: true,
  },
  newColumnButton: {
    lastColumnPosition: 0,
  },
  setNewTaskButton: (
    columnId: string,
    position: number,
    disabled: boolean
  ) => {
    set({
      newTaskButton: {
        columnId: columnId,
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
