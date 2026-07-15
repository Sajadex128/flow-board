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
import { deleteBoard } from "../actions/delete-board";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  boardId: string;
  boardTitle: string;
}

export default function DeleteBoardDialog({ boardId, boardTitle }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setIsLoading(true);
    setError("");

    const result = await deleteBoard(boardId);

    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.message || "خطا در حذف برد");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex p-1.5 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <Trash2 size={16} className="text-destructive" />
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">حذف برد</DialogTitle>
          <DialogDescription>
            آیا مطمئن هستید که می‌خواهید{" "}
            <span className="font-semibold text-foreground">"{boardTitle}"</span> را حذف کنید؟
            <br />
            تمام ستون‌ها و تسک‌های این برد نیز حذف خواهند شد.
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
            {isLoading ? "در حال حذف..." : "حذف برد"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}