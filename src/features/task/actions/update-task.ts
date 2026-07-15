"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { updateTaskSchema } from "../schemas/task-schema";

export async function updateTask(taskId: string, values: unknown) {
  const parsed = updateTaskSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten(),
    };
  }

  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: parsed.data,
    });

    revalidatePath("/");
    revalidatePath("/boards/[boardId]", "page");
    revalidatePath("/boards/[boardId]", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update task error:", error);
    return {
      success: false,
      error: "Failed to update task",
    };
  }
}
