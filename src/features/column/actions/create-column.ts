"use server";

import { prisma } from "@/src/lib/prisma";
import { columnSchema } from "../schemas/column-schema";
import { revalidatePath } from "next/cache";

export async function createColumn(values: unknown, boardId: string) {
  const result = columnSchema.safeParse(values);

  if (!result.success) {
    return {
      error: "Invalid title",
    };
  }

  const lastColumn = await prisma.boardColumn.findFirst({
    where: {
      boardId,
    },
    orderBy: {
      order: "desc",
    },
  });

  await prisma.boardColumn.create({
    data: {
      title: result.data.title,

      order: lastColumn ? lastColumn.order + 1 : 0,

      boardId,
    },
  });

  revalidatePath(`/boards/${boardId}`);

  return {
    success: true,
  };
}
