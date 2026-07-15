"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import { columnSchema, ColumnInput } from "../schemas/column-schema";
import { createColumn } from "../actions/create-column";
import { useRouter } from "next/navigation";

export default function CreateColumnDialog({ boardId }: { boardId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ColumnInput>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      title: "",
    },
  });

  async function submit(values: ColumnInput) {
    setIsLoading(true);
    const result = await createColumn(values, boardId);

    if (result.success) {
      form.reset();
      setOpen(false);
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground cursor-pointer select-none hover:opacity-90 transition">
          <Plus size={18} />
          افزودن ستون
        </span>
      </DialogTrigger>

      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>ساخت ستون جدید</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
          <Input
            className="h-12 rounded-xl"
            placeholder="نام ستون..."
            {...form.register("title")}
          />

          <Button className="w-full rounded-xl" disabled={isLoading}>
            {isLoading ? "در حال ساخت..." : "ساخت"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}