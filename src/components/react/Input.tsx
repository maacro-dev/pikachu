import React from "react";
import { Input as PrimitiveInput } from "@/components/ui/input"
import { cn } from "@/lib/utils";

export function Input({ placeholder, type = "text", className, ...rest }: React.ComponentProps<'input'>) {
  return (
    <PrimitiveInput
      type={type}
      placeholder={placeholder}
      className={cn("focus-visible:ring-admin-input-active border-admin-input", className)}
      {...rest}
    />
  );
}
