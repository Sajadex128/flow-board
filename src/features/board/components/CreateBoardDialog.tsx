"use client";

import { useState, useTransition } from "react";
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

import { Plus, Loader2 } from "lucide-react";

import { boardSchema, BoardInput } from "../schemas/board-schema";
import { createBoard } from "../actions/create-board";
import { useRouter } from "next/navigation";

export default function CreateBoardDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const form = useForm<BoardInput>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: BoardInput) {
    setError("");
    startTransition(async () => {
      const result = await createBoard(values);

      if (result.success) {
        form.reset();
        setOpen(false);
        router.refresh();
      } else {
        setError(result.message || "خطا در ساخت برد");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          className="
            inline-flex
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            py-3
            text-primary-foreground
            font-medium
            shadow-md
            transition
            hover:scale-[1.02]
            select-none
            "
        >
          <Plus size={18} />
          برد جدید
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            ساخت برد جدید
          </DialogTitle>
          <DialogDescription>
            یک برد جدید برای مدیریت تسک‌های خود بسازید
          </DialogDescription>
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
            disabled={pending}
            className="h-12 w-full rounded-xl"
            type="submit"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={18} />
                در حال ساخت...
              </>
            ) : (
              "ساخت برد"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
