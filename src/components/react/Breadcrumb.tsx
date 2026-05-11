import React from "react";

export function Breadcrumb({ section }: { section: string }) {
  if (section === "dashboard") return null;
  return (
    <span className="font-mono text-[11px] text-[#3e3020] hidden sm:block">
      content{" "}
      <span className="text-admin-input">/</span>{" "}
      <span className="text-admin-secondary">{section}</span>
    </span>
  );
}
