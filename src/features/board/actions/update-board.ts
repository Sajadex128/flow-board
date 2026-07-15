"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { boardSchema } from "../schemas/board-schema";

export async function updateBoard(boardId: string, values: unknown) {
  const parsed = boardSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید",
    };
  }

  try {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        userId: session.user.id,
      },
    });

    if (!board) {
      return {
        success: false,
        message: "برد پیدا نشد",
      };
    }

    await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        title: parsed.data.title,
      },
    });

    revalidatePath("/");
    revalidatePath(`/boards/${boardId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update board error:", error);
    return {
      success: false,
      message: "خطا در ویرایش برد",
    };
  }
}