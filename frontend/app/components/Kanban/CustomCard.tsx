import { MyCard } from "@/app/types/TKanban";

interface CustomCardProps {
  card: MyCard;
}

export default function CustomCard({ card }: CustomCardProps) {
  return (
    <>
      <div
        className="shadow-md rounded-md p-4 border border-gray-200 w-52 cursor-pointer"
        onClick={() => console.log(card)}
      >
        <h4 className="font-semibold">{card.title}</h4>
        <p className="text-sm">{card?.description || "Описание отсутствует"}</p>
      </div>
    </>
  );
}
