import React, { useState } from "react";
import { Textarea as PrimitiveTextArea } from "../ui/textarea";

import { cn } from "@/lib/utils";

export function Textarea({ onChange, placeholder, rows = 4, className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <PrimitiveTextArea
      placeholder={placeholder}
      rows={rows}
      className={cn(
        "w-full bg-transparent border rounded-md px-3 py-2",
        "text-admin-foreground placeholder:text-admin-secondary text-sm",
        "focus-visible:ring-admin-input-active border-admin-input",
        className
      )}
      style={{ lineHeight: 1.5 }}
      {...props}
    />
  );
}
