"use client";

import { transformToKanbanBoard } from "@/app/functions/transformToKanbanBoard";
import { IProjectFull } from "@/app/types/IProject";
import { MyCard, MyColumn, MyControlledBoardProps } from "@/app/types/TKanban";
import {
  ControlledBoard as BaseControlledBoard,
} from "@caldwell619/react-kanban/dist/features/board/components/Controlled";
import {
  moveCard,
  moveColumn,
} from "@caldwell619/react-kanban/dist/services/helpers";
import {
  KanbanBoard,
} from "@caldwell619/react-kanban/dist/types";
import { useState } from "react";
import CustomColumnHeader from "./CustomColumnHeader";
import CustomCard from "./CustomCard";
import NewTaskButton from "./NewTaskButton";

interface KanbanSectionProps {
  boardData: IProjectFull;
}

const ControlledBoard =
  BaseControlledBoard as React.ComponentType<MyControlledBoardProps>;

export default function KanbanSection({ boardData }: KanbanSectionProps) {
  const [board, setBoard] = useState<KanbanBoard<MyCard>>(
    transformToKanbanBoard(boardData)
  );

  const handleCardMove: MyControlledBoardProps["onCardDragEnd"] = (
    _card,
    source,
    destination
  ) => {
    setBoard((currentBoard) => {
      return moveCard(currentBoard, source, destination);
    });
  };

  const handleColumnMove: MyControlledBoardProps["onColumnDragEnd"] = (
    _column,
    sourceIndex,
    destinationIndex
  ) => {
    setBoard((currentBoard) =>
      moveColumn(currentBoard, sourceIndex, destinationIndex)
    );
    // console.log("in handleColumnMove", sourceIndex, destinationIndex);
  };

  const [title, setTitle] = useState("task title");

  const handleAddTask = () => {
    const mainColumn = board.columns.find((col) => {
      return (col as MyColumn).metadata.position === 0;
    });

    if (!mainColumn) {
      return;
    }

    console.log(mainColumn);

    const maxPosition =
      mainColumn.cards.reduce((max, card) => {
        return Math.max(max, card.metadata.position);
      }, 0) || 0;

    const newTask: MyCard = {
      id: Date.now().toString(),
      title: title,
      metadata: {
        priority: 0,
        position: maxPosition + 1,
        startDate: undefined,
        endDate: undefined,
        categoryId: undefined,
        isFinished: false,
      },
    };

    setBoard((prevBoard) => ({
      ...prevBoard,
      columns: prevBoard.columns.map((col) => {
        if (col.id === mainColumn.id) {
          return {
            ...col,
            cards: [...col.cards, newTask],
          };
        }

        return col;
      }),
    }));
  };

  return (
    <>
      <div className="flex gap-2">
        <ControlledBoard
          allowAddCard={false}
          allowRenameColumn={true}
          onCardDragEnd={handleCardMove}
          onColumnDragEnd={handleColumnMove}
          renderColumnHeader={(column: MyColumn) => (
            <CustomColumnHeader column={column} />
          )}
          renderCard={(card: MyCard) => <CustomCard card={card} />}
        >
          {board}
        </ControlledBoard>

        <NewTaskButton handleAddTask={handleAddTask} title={title} setTitle={setTitle} />
      </div>
    </>
  );
}
