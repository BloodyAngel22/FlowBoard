export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: number;
  position: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  position: number;
}

export type KanbanBoard = KanbanColumn[];

// Интерфейсы для данных о перемещении
export interface ColumnMoveData {
  columnId: string;
  fromPosition: number;
  toPosition: number;
}

export interface CardMoveData {
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
  fromPosition: number;
  toPosition: number;
}