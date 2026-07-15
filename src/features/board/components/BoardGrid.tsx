import BoardCard from "./BoardCard";

interface Props {
  boards: {
    id: string;
    title: string;
  }[];
}

export default function BoardGrid({ boards }: Props) {
  if (!boards.length) {
    return (
      <div
        className="
        rounded-2xl
        border
        border-dashed
        p-10
        text-center
        text-muted-foreground
        "
      >
        هنوز هیچ بردی ساخته نشده است
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-6
      md:grid-cols-2
      lg:grid-cols-3
      "
    >
      {boards.map((board) => (
        <BoardCard key={board.id} id={board.id} title={board.title} />
      ))}
    </div>
  );
}