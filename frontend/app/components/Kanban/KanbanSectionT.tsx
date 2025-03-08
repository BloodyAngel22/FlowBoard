"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCenter,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CardMoveData,
  ColumnMoveData,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
} from "@/app/types/TMyKanban";

const DefaultCardContent = ({ card }: { card: KanbanCard }) => (
  <>
    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
      {card.title}
    </h4>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      {card.description}
    </p>
    <span className="text-xs text-gray-500 dark:text-gray-400">
      Priority: {card.priority}
    </span>
  </>
);

const DefaultKanbanCardComponent = ({
  card,
  CardContent,
  column,
}: {
  card: KanbanCard;
  CardContent?: React.ComponentType<{ card: KanbanCard; column: KanbanColumn }>;
  column: KanbanColumn;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "all 150ms ease-out",
    opacity: isDragging ? 0.5 : 1,
  };

  const Content = CardContent || DefaultCardContent;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md touch-none"
    >
      <Content card={card} column={column} />
    </div>
  );
};

const DefaultColumnHeader = ({
  title,
  attributes,
  listeners,
}: {
  title: string;
  attributes: any;
  listeners: any;
}) => (
  <h3
    {...attributes}
    {...listeners}
    className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 cursor-grab touch-none"
  >
    {title}
  </h3>
);

const DefaultKanbanColumnComponent = ({
  column,
  ColumnHeader,
  KanbanCardComponent,
  CardContent,
}: {
  column: KanbanColumn;
  ColumnHeader?: React.ComponentType<{
    title: string;
    attributes: any;
    listeners: any;
  }>;
  KanbanCardComponent?: React.ComponentType<{
    card: KanbanCard;
    CardContent?: React.ComponentType<{
      card: KanbanCard;
      column: KanbanColumn;
    }>;
    column: KanbanColumn;
  }>;
  CardContent?: React.ComponentType<{ card: KanbanCard; column: KanbanColumn }>;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "all 150ms ease-out",
    opacity: isDragging ? 0.5 : 1,
  };

  const Header = ColumnHeader || DefaultColumnHeader;
  const Card = KanbanCardComponent || DefaultKanbanCardComponent;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-64 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md min-h-[200px] flex flex-col gap-2 touch-none"
    >
      <Header
        title={column.title}
        attributes={attributes}
        listeners={listeners}
      />
      <SortableContext
        items={column.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            CardContent={CardContent}
            column={column}
          />
        ))}
      </SortableContext>
    </div>
  );
};

interface IKanbanSectionProps {
  board: KanbanBoard;
  onColumnMove?: (data: ColumnMoveData) => void;
  onCardMove?: (data: CardMoveData) => void;
  ColumnHeader?: React.ComponentType<{
    title: string;
    attributes: any;
    listeners: any;
  }>;
  KanbanColumnComponent?: React.ComponentType<{
    column: KanbanColumn;
    ColumnHeader?: React.ComponentType<{
      title: string;
      attributes: any;
      listeners: any;
    }>;
    KanbanCardComponent?: React.ComponentType<{
      card: KanbanCard;
      CardContent?: React.ComponentType<{
        card: KanbanCard;
        column: KanbanColumn;
      }>;
      column: KanbanColumn;
    }>;
    CardContent?: React.ComponentType<{
      card: KanbanCard;
      column: KanbanColumn;
    }>;
  }>;
  KanbanCardComponent?: React.ComponentType<{
    card: KanbanCard;
    CardContent?: React.ComponentType<{
      card: KanbanCard;
      column: KanbanColumn;
    }>;
    column: KanbanColumn;
  }>;
  CardContent?: React.ComponentType<{ card: KanbanCard; column: KanbanColumn }>;
}

export default function KanbanSection({
  board: initialBoard,
  onColumnMove,
  onCardMove,
  ColumnHeader,
  KanbanColumnComponent,
  KanbanCardComponent,
  CardContent,
}: IKanbanSectionProps) {
  const [board, setBoard] = useState<KanbanBoard>(
    initialBoard.sort((a, b) => a.position - b.position)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const isColumn = (id: UniqueIdentifier) => board.some((col) => col.id === id);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || isColumn(active.id)) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = board.find((col) =>
      col.cards.some((card) => card.id === activeId)
    );
    const destinationColumn = board.find(
      (col) => col.cards.some((card) => card.id === overId) || col.id === overId
    );

    if (!sourceColumn || !destinationColumn) return;

    const sourceCards = [...sourceColumn.cards].sort(
      (a, b) => a.position - b.position
    );
    const destCards = [...destinationColumn.cards].sort(
      (a, b) => a.position - b.position
    );
    const activeCardIndex = sourceCards.findIndex(
      (card) => card.id === activeId
    );

    if (sourceColumn.id === destinationColumn.id) {
      const overCardIndex = destCards.findIndex((card) => card.id === overId);
      if (overCardIndex === -1) return;

      const updatedCards = arrayMove(
        sourceCards,
        activeCardIndex,
        overCardIndex
      ).map((card, index) => ({ ...card, position: index }));

      setBoard(
        board.map((col) =>
          col.id === sourceColumn.id ? { ...col, cards: updatedCards } : col
        )
      );

      if (onCardMove) {
        const activeCard = sourceCards[activeCardIndex];
        onCardMove({
          cardId: activeId as string,
          fromColumnId: sourceColumn.id,
          toColumnId: sourceColumn.id,
          fromPosition: activeCard.position,
          toPosition: updatedCards.find((card) => card.id === activeId)!
            .position,
        });
      }
    } else {
      const activeCard = sourceCards[activeCardIndex];
      const fromPosition = activeCard.position;

      sourceCards.splice(activeCardIndex, 1);

      const overIndex =
        overId === destinationColumn.id
          ? destCards.length
          : destCards.findIndex((card) => card.id === overId);
      const toPosition =
        overIndex === destCards.length
          ? (destCards[destCards.length - 1]?.position || 0) + 1
          : destCards[overIndex].position;

      destCards.splice(overIndex, 0, { ...activeCard, position: toPosition });

      const updatedSourceCards = sourceCards.map((card, index) => ({
        ...card,
        position: index,
      }));
      const updatedDestCards = destCards.map((card, index) => ({
        ...card,
        position: index,
      }));

      setBoard(
        board.map((col) =>
          col.id === sourceColumn.id
            ? { ...col, cards: updatedSourceCards }
            : col.id === destinationColumn.id
            ? { ...col, cards: updatedDestCards }
            : col
        )
      );

      if (onCardMove) {
        onCardMove({
          cardId: activeId as string,
          fromColumnId: sourceColumn.id,
          toColumnId: destinationColumn.id,
          fromPosition,
          toPosition,
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (isColumn(activeId)) {
      const oldIndex = board.findIndex((col) => col.id === activeId);
      const newIndex = board.findIndex((col) => col.id === overId);

      const updatedBoard = arrayMove(board, oldIndex, newIndex).map(
        (col, index) => ({
          ...col,
          position: index,
        })
      );

      setBoard(updatedBoard);

      if (onColumnMove) {
        const sourceColumn = board[oldIndex];
        onColumnMove({
          columnId: activeId as string,
          fromPosition: sourceColumn.position,
          toPosition: newIndex,
        });
      }
    }

    setActiveId(null);
  };

  const getActiveItem = () => {
    if (!activeId) return null;

    if (isColumn(activeId)) {
      const column = board.find((col) => col.id === activeId);
      const Header = ColumnHeader || DefaultColumnHeader;
      return column ? (
        <div className="w-64 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-lg opacity-90">
          <Header title={column.title} attributes={{}} listeners={{}} />
        </div>
      ) : null;
    }

    const card = board
      .flatMap((col) => col.cards)
      .find((card) => card.id === activeId);
    const column = board.find((col) =>
      col.cards.some((c) => c.id === activeId)
    );
    const Card = KanbanCardComponent || DefaultKanbanCardComponent;
    return card && column ? (
      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-90">
        {CardContent ? (
          <Card card={card} CardContent={CardContent} column={column} />
        ) : (
          <Card card={card} column={column} />
        )}
      </div>
    ) : null;
  };

  const Column = KanbanColumnComponent || DefaultKanbanColumnComponent;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 p-5 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <SortableContext
          items={board.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          {board.map((column) => (
            <Column
              key={column.id}
              column={column}
              ColumnHeader={ColumnHeader}
              KanbanCardComponent={KanbanCardComponent}
              CardContent={CardContent}
            />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>{getActiveItem()}</DragOverlay>
    </DndContext>
  );
}