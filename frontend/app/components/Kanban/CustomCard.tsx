import { useCategory } from "@/app/hooks/useCategories";
import { MyCard } from "@/app/types/TKanban";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Badge } from "../ui/badge";

interface CustomCardProps {
  card: MyCard;
  isFinished: boolean;
  handleCardClick: (card: MyCard) => void;
}

export default function CustomCard({
  card,
  isFinished,
  handleCardClick,
}: CustomCardProps) {
  const {
    data: category,
    isError,
    error,
  } = useCategory(card.metadata.categoryId || "");

  if (isError && card.metadata.categoryId) {
    console.error("Ошибка загрузки категории:", error);
  }

  const isOverdue =
    card.metadata.endDate &&
    !isFinished &&
    new Date(card.metadata.endDate) < new Date();

  const endDateFormatted = card.metadata.endDate
    ? new Date(card.metadata.endDate).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
      })
    : null;

  return (
    <div
      className={twMerge(
        "w-62 mt-0.5 cursor-pointer rounded-md border bg-white p-4 shadow-md transition-all hover:shadow-lg dark:bg-zinc-900",
        isFinished
          ? "border-green-200 dark:border-green-900"
          : isOverdue
          ? "border-red-200 dark:border-red-900"
          : "border-zinc-200 dark:border-zinc-700"
      )}
      onClick={() => {
        handleCardClick(card);
      }}
    >
      <h4
        className={twMerge(
          "mb-2 font-semibold text-zinc-800 dark:text-zinc-100",
          isFinished && "line-through text-zinc-500 dark:text-zinc-400"
        )}
      >
        {card.title}
      </h4>

      <p className="mb-1.5 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {card.description || "Описание отсутствует"}
      </p>

      <div className="flex flex-row gap-2 items-center">
        <div>
          {category?.data?.name && (
            <Badge className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {category.data.name}
            </Badge>
          )}
        </div>

        <div>
          {endDateFormatted && (
            <div
              className={twMerge(
                "mt-2 -ml-2 flex items-center text-xs mb-1",
                isOverdue && !isFinished
                  ? "text-red-600 dark:text-red-400"
                  : "text-zinc-500 dark:text-zinc-400",
                category?.data.name && "ml-0"
              )}
            >
              <Calendar className="mr-1 h-3.5 w-3.5" />
              <span>{endDateFormatted}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center text-xs">
        {isFinished ? (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            <span>Завершено</span>
          </div>
        ) : (
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span>В работе</span>
          </div>
        )}
      </div>
    </div>
  );
}
