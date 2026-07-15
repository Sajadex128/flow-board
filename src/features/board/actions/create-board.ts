"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { boardSchema } from "../schemas/board-schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function createBoard(values: unknown) {
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
    await prisma.board.create({
      data: {
        title: parsed.data.title,
        userId: session.user.id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Create board error:", error);
    return {
      success: false,
      message: "خطا در ساخت برد",
    };
  }
}