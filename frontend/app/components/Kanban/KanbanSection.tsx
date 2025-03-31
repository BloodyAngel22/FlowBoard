"use client";

import { transformToKanbanBoard } from "@/app/functions/transformToKanbanBoard";
import { IProjectFull } from "@/app/types/IProject";
import {
  MyCard,
  MyColumn,
  MyControlledBoardProps,
  MyKanbanBoard,
} from "@/app/types/TKanban";
import { ControlledBoard as BaseControlledBoard } from "@caldwell619/react-kanban/dist/features/board/components/Controlled";
import {
  moveCard,
  moveColumn,
} from "@caldwell619/react-kanban/dist/services/helpers";
import { useEffect, useState } from "react";
import CustomColumnHeader from "./CustomColumnHeader";
import CustomCard from "./CustomCard";
import NewTaskButton from "./NewTaskButton";
import NewColumnButton from "./NewColumnButton";
import { IColumnForm } from "@/app/types/IColumn.form";
import CardDialog from "./CardDialog";
import ColumnDialog from "./ColumnDialog";
import { useMoveTask } from "@/app/hooks/useTasks";
import { useProjectId } from "@/app/stores/useProjectId";
import { ICardMoveRequest } from "@/app/types/IKanbanTask";
import { IColumnMoveRequest } from "@/app/types/IColumn";
import { useMoveColumn } from "@/app/hooks/useColumns";

interface KanbanSectionProps {
  boardData: IProjectFull;
}

const ControlledBoard =
  BaseControlledBoard as React.ComponentType<MyControlledBoardProps>;

export default function KanbanSection({ boardData }: KanbanSectionProps) {
  const [board, setBoard] = useState<MyKanbanBoard>(
    transformToKanbanBoard(boardData)
  );
  const [selectedCard, setSelectedCard] = useState<MyCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedColumn, setSelectedColumn] = useState<MyColumn | null>(null);
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);

  const { projectId } = useProjectId();

  const { mutate: moveTask, isPending: isMoveTaskPending } = useMoveTask(projectId);
  const { mutate: moveColumnM, isPending: isMoveColumnPending } = useMoveColumn(projectId);

  useEffect(() => {
    const transformedBoard = transformToKanbanBoard(boardData);
    setBoard(transformedBoard);
  }, [boardData]);

  const mainColumn = board.columns.find(
    (col) => (col as MyColumn).metadata.position === 0
  );

  const lastColumnIndex = board.columns.length - 1;

  const getMaxPosition = (): number => {
    if (!mainColumn || !mainColumn.cards || mainColumn.cards.length === 0) {
      return -1;
    }
    return mainColumn.cards.reduce((max, card) => {
      return Math.max(max, card.metadata.position);
    }, 0);
  };

  const isFinished = (card: MyCard): boolean =>
    board.columns.some(
      (column: MyColumn) =>
        column.metadata.isFinished &&
        column.cards.some((cardInColumn) => cardInColumn.id === card.id)
    );

  const handleCardMove: MyControlledBoardProps["onCardDragEnd"] = (
    _card,
    source,
    destination
  ) => {
    console.log("Card", _card.id, "was moved from", source, "to", destination);
    setBoard((currentBoard) => {
      const updatedBoard = moveCard(currentBoard, source, destination);
      return updatedBoard;
    });

    const moveTaskData: ICardMoveRequest = {
      taskId: String(_card.id),
      fromPosition: source?.fromPosition || 0,
      toPosition: destination?.toPosition || 0,
      fromColumnId: String(source?.fromColumnId),
      toColumnId: String(destination?.toColumnId),
    };

    moveTask(moveTaskData, {
      onError: (error) => {
        console.error(error);

        setBoard((currentBoard) => {
          const revertedBoard = moveCard(currentBoard, source, destination);
          return revertedBoard;
        });
      }
    })
  };

  const handleColumnMove: MyControlledBoardProps["onColumnDragEnd"] = (
    _column,
    sourceIndex,
    destinationIndex
  ) => {
    console.log(
      "Column",
      _column.id,
      "was moved from",
      sourceIndex,
      "to",
      destinationIndex
    )
    setBoard((currentBoard) => {
      const updatedBoard = moveColumn(
        currentBoard,
        sourceIndex,
        destinationIndex
      );
      return updatedBoard;
    });

    const moveColumnData: IColumnMoveRequest = {
      columnId: String(_column.id),
      fromPosition: sourceIndex?.fromPosition || 0,
      toPosition: destinationIndex?.toPosition || 0,
    };

    moveColumnM(moveColumnData, {
      onError: (error) => {
        console.error(error);

        setBoard((currentBoard) => {
          const revertedBoard = moveColumn(
            currentBoard,
            sourceIndex,
            destinationIndex
          );
          return revertedBoard;
        });
      }
    })
  };

  const handleCardClick = (card: MyCard) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  const handleColumnClick = (column: MyColumn) => {
    setSelectedColumn(column);
    setIsColumnDialogOpen(true);
  };

  const getColumnIdByCardId = (cardId?: string): string => {
    if (!cardId) {
      return "";
    }
    const column = board.columns.find((column) =>
      column.cards.some((card) => card.id === cardId)
    );

    return column?.id || "";
  };

  const columnId = getColumnIdByCardId(selectedCard?.id);

  return (
    <>
      <div className="flex gap-2 w-auto">
        <ControlledBoard
          allowAddCard={false}
          allowRenameColumn={true}
          onCardDragEnd={handleCardMove}
          onColumnDragEnd={handleColumnMove}
          renderColumnHeader={(column: MyColumn) => (
            <CustomColumnHeader
              column={column}
              handleColumnClick={handleColumnClick}
            />
          )}
          renderCard={(card: MyCard) => (
            <CustomCard
              card={card}
              isFinished={isFinished(card)}
              handleCardClick={handleCardClick}
            />
          )}
        >
          {board}
        </ControlledBoard>

        <NewTaskButton
          listTaskId={mainColumn?.id || ""}
          position={getMaxPosition()}
          disabled={board.columns.length === 0}
        />

        <NewColumnButton lastColumnPosition={lastColumnIndex} />
      </div>

      <CardDialog
        cardId={selectedCard?.id}
        columnId={columnId}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedCard(null);
        }}
      />

      <ColumnDialog
        columnId={selectedColumn?.id}
        isOpen={isColumnDialogOpen}
        onClose={() => {
          setIsColumnDialogOpen(false);
          setSelectedColumn(null);
        }}
      />
    </>
  );
}
