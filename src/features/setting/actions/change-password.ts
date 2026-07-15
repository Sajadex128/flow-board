"use server";

import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "رمز فعلی را وارد کنید"),
  newPassword: z.string().min(8, "رمز جدید باید حداقل ۸ کاراکتر باشد"),
  confirmPassword: z.string().min(1, "تکرار رمز را وارد کنید"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "رمزهای جدید مطابقت ندارند",
  path: ["confirmPassword"],
});

export async function changePassword(values: unknown) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      message: "لطفاً ابتدا وارد حساب کاربری خود شوید",
    };
  }

  const parsed = changePasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "اطلاعات وارد شده صحیح نیست",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "کاربر پیدا نشد",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      parsed.data.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "رمز فعلی اشتباه است",
      };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "رمز عبور با موفقیت تغییر کرد",
    };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      message: "خطا در تغییر رمز عبور",
    };
  }
}