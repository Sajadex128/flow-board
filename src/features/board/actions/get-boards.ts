"use server";

import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function getBoards() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  return prisma.board.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}