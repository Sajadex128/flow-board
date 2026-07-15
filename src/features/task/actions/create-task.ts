"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { createTaskSchema } from "@/src/features/task/schemas/task-schema";

export async function createTask(
  values: unknown,
  columnId: string,
  boardId: string,
) {
  const parsed = createTaskSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten(),
    };
  }

  try {
    const lastTask = await prisma.task.findFirst({
      where: {
        columnId: columnId,
      },
      orderBy: {
        order: "desc",
      },
    });

    // محاسبه order جدید
    const newOrder = lastTask ? lastTask.order + 1 : 0;

    await prisma.task.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        priority: parsed.data.priority,
        columnId: columnId,
        order: newOrder,
      },
    });

    revalidatePath(`/boards/${boardId}`);
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Create task error:", error);
    return {
      success: false,
      error: "Failed to create task",
    };
  }
}