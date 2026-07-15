import { z } from "zod";

export const boardSchema = z.object({
  title: z
    .string()
    .min(3, "Board title is required")
    .max(50),
});

export type BoardInput = z.infer<typeof boardSchema>;