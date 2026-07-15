import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد"),

  email: z
    .string()
    .email("ایمیل معتبر نیست"),

  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export type RegisterInput = z.infer<typeof registerSchema>;