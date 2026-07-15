"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddTaskDialog from "@/src/features/task/components/AddTaskDialog";

type BoardColumnProps = {
  column: {
    id: string;
    title: string;
    boardId: string;
  };
};

export default function BoardColumn({ column }: BoardColumnProps) {
  return (
    <Card className="w-[300px] min-h-[300px] rounded-xl">
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <AddTaskDialog columnId={column.id} boardId={column.boardId} />
      </CardContent>
    </Card>
  );
}
