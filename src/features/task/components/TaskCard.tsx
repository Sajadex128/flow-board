"use client";

import { Task } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { useState } from "react";

interface Props {
  task: Task;
  isDragging?: boolean;
  boardId?: string;
  onTaskUpdated?: () => void;
  onTaskDeleted?: () => void;
}

export default function TaskCard({ 
  task, 
  isDragging, 
  boardId = "",
  onTaskUpdated,
  onTaskDeleted,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
  });

  const [showActions, setShowActions] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms ease",
  };

  const dragging = isDragging || isSortableDragging;

  const priorityColors = {
    HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    LOW: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const priorityLabels = {
    HIGH: "🔴 بالا",
    MEDIUM: "🟡 متوسط",
    LOW: "🟢 پایین",
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ scale: 1 }}
      animate={{
        scale: dragging ? 1.02 : 1,
        boxShadow: dragging ? "0 8px 30px rgba(0,0,0,0.12)" : "none",
      }}
      transition={{ duration: 0.15 }}
      className={`
        cursor-grab
        rounded-xl
        border
        bg-background
        p-3
        shadow-sm
        active:cursor-grabbing
        touch-none
        ${dragging ? "z-50 shadow-xl ring-2 ring-primary/20" : ""}
        hover:shadow-md
        transition-shadow
        group
        relative
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium flex-1 break-words">{task.title}</h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showActions || dragging ? 1 : 0,
            scale: showActions || dragging ? 1 : 0.8,
          }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-0.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <EditTaskDialog 
            task={task} 
            boardId={boardId}
            onTaskUpdated={onTaskUpdated}
          />
          <DeleteTaskDialog
            taskId={task.id}
            taskTitle={task.title}
            boardId={boardId}
            onTaskDeleted={onTaskDeleted}
          />
        </motion.div>
      </div>

      {task.description && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            priorityColors[task.priority as keyof typeof priorityColors]
          }`}
        >
          {priorityLabels[task.priority as keyof typeof priorityLabels]}
        </span>
      </div>
    </motion.div>
  );
}