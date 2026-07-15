"use server";
import bcrypt from "bcryptjs";

import { prisma } from "@/src/lib/prisma";
import { registerSchema } from "../schemas/register-schema";

export async function registerUser(values: unknown) {
  const result = registerSchema.safeParse(values);

  if (!result.success) {
    return {
      error: "Invalid data",
    };
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}
