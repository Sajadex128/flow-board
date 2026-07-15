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
import { columnSchema, ColumnInput } from "../schemas/column-schema";
import { updateColumn } from "../actions/update-column";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface Props {
  columnId: string;
  columnTitle: string;
  boardId: string;
}

export default function EditColumnDialog({ columnId, columnTitle, boardId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ColumnInput>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      title: columnTitle,
    },
  });

  async function onSubmit(values: ColumnInput) {
    setIsLoading(true);
    setError("");

    const result = await updateColumn(columnId, values);

    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error || "خطا در ویرایش ستون");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          role="button"
          tabIndex={0}
          className="p-1 rounded hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          <Pencil size={14} className="text-muted-foreground" />
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">ویرایش ستون</DialogTitle>
          <DialogDescription>نام ستون را تغییر دهید</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <Input
            className="h-12 rounded-xl"
            placeholder="نام ستون..."
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