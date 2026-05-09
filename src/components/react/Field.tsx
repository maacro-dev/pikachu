import React from "react";
import { FieldLabel, Field as PrimitiveField } from "../ui/field";

interface FieldProps extends React.PropsWithChildren {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
}

export function Field({ label, hint, children, required = false, error }: FieldProps) {
  return (
    <PrimitiveField>
      <FieldLabel className="text-2xs font-bold tracking-widest uppercase text-admin-primary gap-0.5">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </FieldLabel>
      {children}
      {error && <span className="text-2xs text-red-400">{error}</span>}   {/* ← */}
      {hint && !error && <span className="text-2xs text-admin-secondary">{hint}</span>}
    </PrimitiveField>
  );
}
