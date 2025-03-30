import { useCategory } from "@/app/hooks/useCategories";
import { MyCard } from "@/app/types/TKanban";
import { twMerge } from "tailwind-merge";

interface CustomCardProps {
  card: MyCard;
  isFinished: boolean;
  handleCardClick: (card: MyCard) => void;
}

export default function CustomCard({ card, isFinished, handleCardClick }: CustomCardProps) {
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useCategory(card.metadata.categoryId || "");

  if (isLoading) {
    return (
      <div className="shadow-md rounded-md p-4 border border-gray-200 w-52">
        Loading...
      </div>
    );
  }

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
    <>
      <div
        className="shadow-md rounded-md p-4 border border-gray-200 w-52 cursor-pointer"
        onClick={() => { console.log(card); handleCardClick(card); }}
      >
        <h4 className={twMerge("font-semibold", isFinished && "line-through")}>
          {card.title}
        </h4>
        <p className="text-sm">{card.description || "Описание отсутствует"}</p>
        {category?.data?.name && (
          <p className="text-sm">{category.data.name}</p>
        )}
        <p
          className={`text-sm ${
            isFinished ? "text-green-400" : "text-red-400"
          }`}
        >
          {isFinished ? "Завершено" : "В работе"}
        </p>
        {endDateFormatted && (
          <p className="text-sm">
            <span className={isOverdue ? "text-red-400" : ""}>
              {endDateFormatted}
            </span>
          </p>
        )}
      </div>
    </>
  );
}
