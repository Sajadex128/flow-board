"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function reorderColumns(
  boardId: string,
  columns: { id: string; order: number }[]
) {
  try {
    for (const col of columns) {
      await prisma.boardColumn.update({
        where: { id: col.id },
        data: { order: col.order },
      });
    }

    revalidatePath(`/boards/${boardId}`);
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Reorder columns error:", error);
    return {
      success: false,
      error: "خطا در جابجایی ستون‌ها",
    };
  }
}