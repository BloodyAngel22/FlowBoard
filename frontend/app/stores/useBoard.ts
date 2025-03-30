import { create } from 'zustand';
import { MyKanbanBoard } from '../types/TKanban';

interface BoardStore {
  board: MyKanbanBoard;
  setBoard: (board: MyKanbanBoard) => void;
}

export const useBoard = create<BoardStore>((set) => ({
  board: {
    columns: [],
  },
  setBoard: (board: MyKanbanBoard) => set({ board }),
}));