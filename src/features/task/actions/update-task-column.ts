"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskColumn(taskId: string, columnId: string) {
  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        columnId: columnId,
      },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update task column error:", error);
    return {
      success: false,
      error: "Failed to update task column",
    };
  }
}