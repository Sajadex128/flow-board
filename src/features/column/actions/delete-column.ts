"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteColumn(columnId: string, boardId: string) {
  try {
    await prisma.boardColumn.delete({
      where: {
        id: columnId,
      },
    });

    revalidatePath(`/boards/${boardId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete column error:", error);
    return {
      success: false,
      error: "خطا در حذف ستون",
    };
  }
}