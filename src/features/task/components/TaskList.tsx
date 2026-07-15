"use client";

import { Task } from "@prisma/client";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";

interface Props {
  tasks: Task[];
  activeId?: string | null;
  boardId?: string;
  onTaskUpdated?: () => void;
  onTaskDeleted?: () => void;
}

export default function TaskList({
  tasks,
  activeId,
  boardId = "",
  onTaskUpdated,
  onTaskDeleted,
}: Props) {
  if (!tasks.length) {
    return (
      <div className="mt-4 rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground">
        هیچ تسکی وجود ندارد
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {tasks.map((task) => {
        const isDragging = activeId === task.id;
        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isDragging ? 0.5 : 1,
              scale: isDragging ? 0.95 : 1,
            }}
            transition={{ duration: 0.15 }}
            layout
          >
            <TaskCard
              task={task}
              isDragging={isDragging}
              boardId={boardId}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          </motion.div>
        );
      })}
    </div>
  );
}