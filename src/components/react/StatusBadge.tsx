import React from "react";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide",
      published
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        : "bg-admin-input text-admin-secondary border border-admin-border"
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        published ? "bg-emerald-400" : "bg-[#3e3020]"
      )} />
      {published ? "Published" : "Draft"}
    </span>
  );
}
