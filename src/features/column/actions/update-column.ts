"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { columnSchema } from "../schemas/column-schema";

export async function updateColumn(columnId: string, values: unknown) {
  const parsed = columnSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "عنوان معتبر نیست",
    };
  }

  try {
    await prisma.boardColumn.update({
      where: {
        id: columnId,
      },
      data: {
        title: parsed.data.title,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update column error:", error);
    return {
      success: false,
      error: "خطا در ویرایش ستون",
    };
  }
}