import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export function Topbar({ section }: { section: string }) {
  return (
    <header className="h-14 px-4 flex items-center justify-between border-b border-admin-border shrink-0 gap-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-[#3e3020] hover:text-admin-primary transition-colors" />
        <div className="w-px h-4 bg-admin-border" />
        <Breadcrumb section={section} />
      </div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-md",
          "border border-admin-border text-admin-secondary",
          "hover:border-amber-500/30 hover:text-amber-500/80",
          "transition-colors"
        )}
      >
        <ExternalLink size={11} />
        View site
      </a>
    </header>
  );
}
