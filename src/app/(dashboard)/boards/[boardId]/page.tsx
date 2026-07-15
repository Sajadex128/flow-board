import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import CreateColumnDialog from "@/src/features/column/components/CreateColumnDialog";
import BoardDnd from "@/src/features/board/components/BoardDnd";

export default async function BoardPage({
  params,
}: {
  params: Promise<{
    boardId: string;
  }>;
}) {
  const { boardId } = await params;

  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      columns: {
        orderBy: {
          order: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{board.title}</h1>
          <p className="mt-2 text-muted-foreground">تسک‌های خود را مدیریت کنید</p>
        </div>

        <CreateColumnDialog boardId={board.id} />
      </div>

      <BoardDnd columns={board.columns} boardId={board.id} />
    </div>
  );
}