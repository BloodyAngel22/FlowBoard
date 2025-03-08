"use client";

import { useEffect } from "react";
import { KanbanCard, KanbanColumn } from "../types/TMyKanban";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: KanbanCard | null;
  column: KanbanColumn | null;
}

export const Modal = ({ isOpen, onClose, card, column }: ModalProps) => {
  // Закрытие по нажатию Esc
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !card || !column) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {card.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            {card.description}
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Приоритет:</span> {card.priority}
            </p>
            <p className="text-sm">
              <span className="font-medium">Колонка:</span> {column.title}
            </p>
            <p className="text-sm">
              <span className="font-medium">Позиция:</span> {card.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};