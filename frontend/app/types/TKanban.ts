import {
  ControlledBoardProps,
  OnDragEndNotification,
} from "@caldwell619/react-kanban/dist/features/board/components/Controlled";
import {
  Card,
  Column,
  KanbanBoard,
} from "@caldwell619/react-kanban/dist/types";
import { JSX } from "react/jsx-runtime";

export interface MyKanbanBoard extends KanbanBoard<MyCard> {
  columns: MyColumn[];
}

export interface MyCard extends Card {
  metadata: {
    priority: number;
    position: number;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    categoryId: string | undefined;
    isFinished: boolean;
  };
}

export interface MyColumn extends Column<MyCard> {
  metadata: {
    isFinished: boolean;
    position: number;
    color?: string | null;
  };
}

export interface MyControlledBoardProps
  extends Omit<
    ControlledBoardProps<MyCard>,
    "renderColumnHeader" | "onColumnDragEnd" | "children"
  > {
  renderColumnHeader?: (column: MyColumn) => JSX.Element;
  onColumnDragEnd?: OnDragEndNotification<MyColumn>;
  children: KanbanBoard<MyCard>;
}