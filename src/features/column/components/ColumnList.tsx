"use client";

import { BoardColumn, Task } from "@prisma/client";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import AddTaskDialog from "@/src/features/task/components/AddTaskDialog";
import TaskList from "@/src/features/task/components/TaskList";
import { AnimatePresence, motion } from "framer-motion";
import EditColumnDialog from "./EditColumnDialog";
import DeleteColumnDialog from "./DeleteColumnDialog";
import { useState } from "react";

interface ColumnWithTasks extends BoardColumn {
  tasks: Task[];
}

interface Props {
  columns: ColumnWithTasks[];
  boardId: string;
  activeId?: string | null;
}

function ColumnItem({
  column,
  boardId,
  activeId,
}: {
  column: ColumnWithTasks;
  boardId: string;
  activeId?: string | null;
}) {
  const [showActions, setShowActions] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms ease",
  };

  const isActive = activeId === column.id;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`
        w-[320px] shrink-0
        ${isDragging || isActive ? "opacity-50 scale-95 z-50" : ""}
        ${isOver ? "ring-2 ring-primary/50 rounded-2xl" : ""}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div ref={setDroppableRef} className="rounded-2xl bg-muted/50 border p-4 h-fit cursor-grab">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">{column.title}</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {column.tasks.length}
            </span>
          </div>

          <div
            className={`
              flex items-center gap-0.5 transition-all duration-200
              ${showActions ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <EditColumnDialog
              columnId={column.id}
              columnTitle={column.title}
              boardId={boardId}
            />
            <DeleteColumnDialog
              columnId={column.id}
              columnTitle={column.title}
              boardId={boardId}
            />
          </div>
        </div>

        <ColumnTasks column={column} boardId={boardId} />

        <div className="mt-4">
          <AddTaskDialog columnId={column.id} boardId={boardId} />
        </div>
      </div>
    </motion.div>
  );
}

function ColumnTasks({
  column,
  boardId,
}: {
  column: ColumnWithTasks;
  boardId: string;
}) {
  return (
    <div className="min-h-[100px]">
      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence mode="popLayout">
          {column.tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <TaskList tasks={[task]} boardId={boardId} />
            </motion.div>
          ))}
        </AnimatePresence>
      </SortableContext>
    </div>
  );
}

export default function ColumnList({
  columns,
  boardId,
  activeId,
}: Props) {
  return (
    <SortableContext
      items={columns.map((col) => col.id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-6 overflow-x-auto pb-5">
        <AnimatePresence initial={false}>
          {columns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              boardId={boardId}
              activeId={activeId}
            />
          ))}
        </AnimatePresence>
      </div>
    </SortableContext>
  );
}