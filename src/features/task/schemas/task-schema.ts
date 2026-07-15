import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(2, "Title is too short").max(50),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2, "Title is too short").max(50).optional(),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;