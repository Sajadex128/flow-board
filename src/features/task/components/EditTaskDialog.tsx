"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@prisma/client";
import { updateTask } from "../actions/update-task";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

interface Props {
  task: Task;
  boardId: string;
  trigger?: React.ReactNode;
  onTaskUpdated?: () => void;
}

export default function EditTaskDialog({
  task,
  boardId,
  trigger,
  onTaskUpdated,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
      });
    }
  }, [open, task]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    const result = await updateTask(task.id, formData);

    if (result.success) {
      setOpen(false);
      router.refresh();
      if (onTaskUpdated) {
        onTaskUpdated();
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
            className="inline-flex p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            onClick={() => setOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
          >
            <Pencil size={14} className="text-muted-foreground" />
          </motion.span>
        )}
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">ویرایش تسک</DialogTitle>
          <DialogDescription>جزئیات تسک را ویرایش کنید</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              عنوان <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="عنوان تسک..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-11 rounded-xl"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">توضیحات</label>
            <Textarea
              placeholder="توضیحات را وارد کنید..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[80px] rounded-xl resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">اولویت</label>
            <Select
              value={formData.priority}
              onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger className="rounded-xl h-11">
                <SelectValue placeholder="انتخاب اولویت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">🟢 پایین</SelectItem>
                <SelectItem value="MEDIUM">🟡 متوسط</SelectItem>
                <SelectItem value="HIGH">🔴 بالا</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
              className="flex-1 rounded-xl"
            >
              {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="rounded-xl"
            >
              انصراف
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}