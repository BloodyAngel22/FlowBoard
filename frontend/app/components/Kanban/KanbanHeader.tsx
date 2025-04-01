import Link from "next/link";
import FlowBoardLogo from "../FlowBoardLogo";
import { useKanbanButton } from "@/app/stores/useKanbanButton";
import NewTaskButton from "./NewTaskButton";
import NewColumnButton from "./NewColumnButton";
import { MainDialogSection } from "../Categories/MainDialogSection";

export default function KanbanHeader() {
  const { newTaskButton, newColumnButton } = useKanbanButton();

  return (
    <>
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <FlowBoardLogo />
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              На главную
            </Link>
            <NewTaskButton
              listTaskId={newTaskButton.listTaskId}
              position={newTaskButton.position}
              disabled={newTaskButton.disabled}
            />
            <NewColumnButton
              lastColumnPosition={newColumnButton.lastColumnPosition}
            />
            <MainDialogSection />
          </div>
        </div>
      </div>
    </>
  );
}