import React from 'react';
import { Plus } from "lucide-react";
import { ContentTable, type Column } from './ContentTable';

interface SectionViewProps {
  title: string;
  type: string;
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string | number) => void;
  onNew: () => void;
  columns?: Column[];
}



export function SectionView({ title, type, items, onEdit, onDelete, onNew, columns = [] }: SectionViewProps) {
  const singular = title.replace(/s$/, "");
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-admin-foreground leading-none">{title}</h1>
          <p className="text-[13px] text-[#3e3020] mt-1.5">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          onClick={onNew}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#1a1208] px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
        >
          <Plus size={14} /> New {singular}
        </button>
      </div>

      <div className="bg-[#0f0b06] rounded-xl border border-admin-border overflow-hidden">
        <ContentTable
          items={items}
          onEdit={onEdit}
          onDelete={onDelete}
          columns={columns}
        />
      </div>
    </div>
  );
}
