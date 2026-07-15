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
import { deleteColumn } from "../actions/delete-column";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  columnId: string;
  columnTitle: string;
  boardId: string;
}

export default function DeleteColumnDialog({ columnId, columnTitle, boardId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setIsLoading(true);
    setError("");

    const result = await deleteColumn(columnId, boardId);

    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error || "خطا در حذف ستون");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          role="button"
          tabIndex={0}
          className="p-1 rounded hover:bg-destructive/10 transition-colors cursor-pointer"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <Trash2 size={14} className="text-destructive" />
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">حذف ستون</DialogTitle>
          <DialogDescription>
            آیا مطمئن هستید که می‌خواهید{" "}
            <span className="font-semibold text-foreground">"{columnTitle}"</span> را حذف کنید؟
            <br />
            تمام تسک‌های این ستون نیز حذف خواهند شد.
            <br />
            این عمل قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl">
            {error}
          </p>
        )}

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
            {isLoading ? "در حال حذف..." : "حذف ستون"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}