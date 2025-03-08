"use client";

import { useProject } from "@/app/hooks/useProjects";
import { IKanbanTask } from "@/app/types/IKanbanTask";
import { IListTasks } from "@/app/types/IListTasks";
import { IProjectFull } from "@/app/types/IProject";
import { ControlledBoard, moveCard, UncontrolledBoard } from "@caldwell619/react-kanban";
import { OnDragEndNotification } from "@caldwell619/react-kanban/dist/features/board/components/shared";
import { Card, KanbanBoard } from "@caldwell619/react-kanban/dist/types";

import { use, useState } from "react";

interface ProjectProps {
  params: Promise<{ id: string }>;
}

// interface ExtendedKanbanColumn extends KanbanColumn {
//   isFinished?: boolean;
// }

// const transformToKanbanBoard = (data: IProjectFull): KanbanBoard => {
//   if (!data?.listTasks || data.listTasks.length === 0) {
//     return [];
//   }

//   return data.listTasks.map((column: IListTasks) => ({
//     id: column.id,
//     title: column.name,
//     position: column.position,
//     isFinished: column.isFinished,
//     cards: column.tasks.map((task: IKanbanTask) => ({
//       id: task.id,
//       title: task.name,
//       description: task.description || "Нет описания",
//       priority: task.priority,
//       position: task.position,
//     })),
//   })) as ExtendedKanbanColumn[];
// };

// const CustomCardContent = ({
//   card,
//   column,
// }: {
//   card: KanbanCard;
//   column: ExtendedKanbanColumn;
// }) => (
//   <div className="flex flex-col gap-2">
//     <h4
//       className={`text-lg font-bold ${
//         column.isFinished ? "text-green-600" : "text-blue-600"
//       }`}
//     >
//       {card.title}
//     </h4>
//     <p className="text-sm italic">{card.description}</p>
//     <span className="text-xs uppercase">P: {card.priority}</span>
//     {column.isFinished && (
//       <span className="text-xs text-green-500">Завершено</span>
//     )}
//   </div>
// );

const CustomColumnHeader = ({
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
    className="text-2xl font-bold text-green-600 mb-3 cursor-grab touch-none"
  >
    {title.toUpperCase()}
  </h3>
);

export default function Project({ params }: ProjectProps) {
  const resolvedParams = use(params);
  const { data, isSuccess, isLoading, isError, error } = useProject(
    resolvedParams.id
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // const [board, setBoard] = useState<KanbanBoard>()

  // const boardData =
  //   isSuccess && data.data ? transformToKanbanBoard(data.data) : [];

  // const handleCardMove = (moveData: CardMoveData) => {
  //   const { cardId, fromColumnId, toColumnId, fromPosition, toPosition } =
  //     moveData;
  //   if (fromColumnId !== toColumnId || fromPosition !== toPosition) {
  //     console.log("Card moved:", moveData);
  //   }
  // };

  // const handleColumnMove = (moveData: ColumnMoveData) => {
  //   const { columnId, fromPosition, toPosition } = moveData;
  //   if (fromPosition !== toPosition) {
  //     console.log("Column moved:", moveData);
  //   }
  // };

  
  const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
    setBoard((currentBoard) => {
      return moveCard(currentBoard, source, destination)
    })
  }

  return (
    <>
      <div>Project</div>
      {/* {isSuccess && <pre>{JSON.stringify(boardData, null, 2)}</pre>} */}
      {/* {isSuccess && (
        <KanbanSection
          board={boardData}
          onColumnMove={handleColumnMove}
          onCardMove={handleCardMove}
          ColumnHeader={CustomColumnHeader}
          CardContent={CustomCardContent}
        />
      )} */}
      <ControlledBoard onCardDragEnd={handleCardMove}>
        {board}
      </ControlledBoard>
    </>
  );
}
