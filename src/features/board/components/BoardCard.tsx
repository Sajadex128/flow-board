"use client";

import Link from "next/link";
import EditBoardDialog from "./EditBoardDialog";
import DeleteBoardDialog from "./DeleteBoardDialog";
import { useState } from "react";

interface Props {
  id: string;
  title: string;
}

export default function BoardCard({ id, title }: Props) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Link
        href={`/boards/${id}`}
        className="
          block
          rounded-2xl
          border
          bg-background
          p-6
          shadow-sm
          transition
          hover:shadow-md
          hover:border-primary/20
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              font-bold
              text-primary
              text-lg
            "
          >
            {title.charAt(0)}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">مشاهده برد</p>
          </div>
        </div>
      </Link>

      <div
        className={`
          absolute top-3 left-3 flex items-center gap-1
          transition-all duration-200
          ${showActions ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        <EditBoardDialog boardId={id} boardTitle={title} />
        <DeleteBoardDialog boardId={id} boardTitle={title} />
      </div>
    </div>
  );
}