"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function reorderTasks(
  columnId: string,
  boardId: string,
  tasks: { id: string; order: number }[]
) {
  try {
    for (const task of tasks) {
      await prisma.task.update({
        where: { id: task.id },
        data: { order: task.order },
      });
    }

    revalidatePath(`/boards/${boardId}`);
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Reorder tasks error:", error);
    return {
      success: false,
      error: "خطا در جابجایی تسک‌ها",
    };
  }
}