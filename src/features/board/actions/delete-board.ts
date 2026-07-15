"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function deleteBoard(boardId: string) {
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

    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete board error:", error);
    return {
      success: false,
      message: "خطا در حذف برد",
    };
  }
}