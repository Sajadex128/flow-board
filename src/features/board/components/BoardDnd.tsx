"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useCallback, useEffect } from "react";
import { BoardColumn, Task } from "@prisma/client";
import { reorderTasks } from "@/src/features/task/actions/reorder-tasks";
import { reorderColumns } from "@/src/features/column/actions/reorder-columns";
import ColumnList from "@/src/features/column/components/ColumnList";
import { useRouter } from "next/navigation";

interface ColumnWithTasks extends BoardColumn {
  tasks: Task[];
}

interface Props {
  columns: ColumnWithTasks[];
  boardId: string;
}

export default function BoardDnd({ columns: initialColumns, boardId }: Props) {
  const router = useRouter();
  const [columns, setColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
    console.log("🟢 Drag Start:", event.active.id.toString());
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      
      console.log("🔴 Drag End - Active:", active?.id, "Over:", over?.id);

      if (!over) {
        console.log("❌ No over target");
        return;
      }

      const activeId = active.id.toString();
      const overId = over.id.toString();

      if (activeId === overId) {
        console.log("⏭️ Same target");
        return;
      }

      const isColumn = columns.some((col) => col.id === activeId);
      console.log("📌 Is Column:", isColumn, "Active:", activeId);

      if (isColumn) {
        // جابجایی ستون
        const oldIndex = columns.findIndex((col) => col.id === activeId);
        const newIndex = columns.findIndex((col) => col.id === overId);

        console.log("🔄 Column move - from:", oldIndex, "to:", newIndex);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const reorderedColumns = arrayMove(columns, oldIndex, newIndex);

          setColumns(reorderedColumns);

          const updates = reorderedColumns.map((col, index) => ({
            id: col.id,
            order: index,
          }));
          await reorderColumns(boardId, updates);
          router.refresh();
        }
        return;
      }

      // جابجایی تسک در همان ستون
      const activeColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === activeId)
      );
      if (!activeColumn) {
        console.log("❌ Active column not found");
        return;
      }

      const overColumn = columns.find((col) => 
        col.tasks.some((task) => task.id === overId) || col.id === overId
      );
      if (!overColumn) {
        console.log("❌ Over column not found");
        return;
      }

      // اگر ستون تغییر کرده، اجازه نده
      if (activeColumn.id !== overColumn.id) {
        console.log("🚫 Column changed, not allowed");
        return;
      }

      // جابجایی در همان ستون
      const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
      const newIndex = activeColumn.tasks.findIndex((t) => t.id === overId);

      console.log("🔄 Task move - from:", oldIndex, "to:", newIndex);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const reorderedTasks = arrayMove(activeColumn.tasks, oldIndex, newIndex);

        setColumns((prev) =>
          prev.map((col) =>
            col.id === activeColumn.id
              ? {
                  ...col,
                  tasks: reorderedTasks.map((t, index) => ({
                    ...t,
                    order: index,
                  })),
                }
              : col
          )
        );

        const taskUpdates = reorderedTasks.map((t, index) => ({
          id: t.id,
          order: index,
        }));
        await reorderTasks(activeColumn.id, boardId, taskUpdates);
        router.refresh();
      }
    },
    [columns, boardId, router]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <ColumnList columns={columns} boardId={boardId} activeId={activeId} />
    </DndContext>
  );
}