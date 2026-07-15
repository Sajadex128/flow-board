"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    revalidatePath("/");
    revalidatePath("/boards/[boardId]", "page");
    revalidatePath("/boards/[boardId]", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete task error:", error);
    return {
      success: false,
      error: "Failed to delete task",
    };
  }
}
