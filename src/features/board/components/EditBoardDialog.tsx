"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { boardSchema, BoardInput } from "../schemas/board-schema";
import { updateBoard } from "../actions/update-board";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface Props {
  boardId: string;
  boardTitle: string;
}

export default function EditBoardDialog({ boardId, boardTitle }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<BoardInput>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: boardTitle,
    },
  });

  async function onSubmit(values: BoardInput) {
    setIsLoading(true);
    setError("");

    const result = await updateBoard(boardId, values);

    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.message || "خطا در ویرایش برد");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <Pencil size={16} className="text-muted-foreground" />
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">ویرایش برد</DialogTitle>
          <DialogDescription>نام برد را تغییر دهید</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <Input
            className="h-12 rounded-xl"
            placeholder="نام پروژه..."
            {...form.register("title")}
          />

          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl">
              {error}
            </p>
          )}

          <Button
            disabled={isLoading}
            className="h-12 w-full rounded-xl"
            type="submit"
          >
            {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}