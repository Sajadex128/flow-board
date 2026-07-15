"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteTask } from "../actions/delete-task";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface Props {
  taskId: string;
  taskTitle: string;
  boardId: string;
  trigger?: React.ReactNode;
  onTaskDeleted?: () => void;
}

export default function DeleteTaskDialog({
  taskId,
  taskTitle,
  boardId,
  trigger,
  onTaskDeleted,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    const result = await deleteTask(taskId);

    if (result.success) {
      setOpen(false);
      router.refresh();
      if (onTaskDeleted) {
        onTaskDeleted();
      }
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger || (
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex p-1.5 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
            onClick={() => setOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
          >
            <Trash2 size={14} className="text-destructive" />
          </motion.span>
        )}
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">حذف تسک</DialogTitle>
          <DialogDescription>
            آیا مطمئن هستید که می‌خواهید{" "}
            <span className="font-semibold text-foreground">"{taskTitle}"</span> را حذف کنید؟
            این عمل قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl"
          >
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? "در حال حذف..." : "حذف تسک"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}