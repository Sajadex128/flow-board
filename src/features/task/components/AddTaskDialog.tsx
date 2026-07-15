"use client";

import { useState } from "react";
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
import { createTask } from "../actions/create-task";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function AddTaskDialog({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
  });

  async function submit() {
    if (!formData.title.trim()) return;

    setIsLoading(true);
    const result = await createTask(
      {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
      },
      columnId,
      boardId
    );

    if (result.success) {
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
      });
      setOpen(false);
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-dashed px-4 py-2.5 text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all cursor-pointer select-none"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <Plus size={18} />
          افزودن تسک
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">ساخت تسک جدید</DialogTitle>
          <DialogDescription>
            یک تسک جدید به این ستون اضافه کنید
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              عنوان <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="عنوان تسک را وارد کنید..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-11 rounded-xl"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              توضیحات
            </label>
            <Textarea
              placeholder="توضیحات تسک را وارد کنید..."
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
              onClick={submit}
              disabled={isLoading || !formData.title.trim()}
              className="flex-1 rounded-xl"
            >
              {isLoading ? "در حال ساخت..." : "ساخت تسک"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setFormData({
                  title: "",
                  description: "",
                  priority: "MEDIUM",
                });
              }}
              className="rounded-xl"
            >
              انصراف
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}