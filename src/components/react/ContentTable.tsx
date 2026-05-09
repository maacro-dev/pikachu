import { useState } from "react";
import React from 'react';
import { Icon } from "./Icon";
import { Search, Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

type SortDir = "asc" | "desc" | null;

export interface Column {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
  sortable?: boolean;
}


interface ContentTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string | number) => void;
  columns?: Column[];
}


export function ContentTable({ items, onEdit, onDelete, columns = [] }: ContentTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);

  const filtered = items.filter((item) =>
    [item.name, item.slug, item.tagline, item.venue]
      .filter(Boolean)
      .some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const toggleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); return; }
    if (sortDir === "asc") { setSortDir("desc"); return; }
    setSortKey(null); setSortDir(null);
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ArrowUpDown size={11} className="text-[#3e3020]" />;
    return sortDir === "asc"
      ? <ArrowUp size={11} className="text-amber-500" />
      : <ArrowDown size={11} className="text-amber-500" />;
  };

  const allCols: Column[] = [
    { key: "name", label: "Name", sortable: true },
    ...columns,
    { key: "status", label: "Status", sortable: true },
  ];

  if (items.length === 0 && !search) {
    return <EmptyState filtered={false} onClear={() => setSearch("")} />;
  }

  return (
    <div>
      <div className="px-4 py-3 border-b border-admin-border">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3e3020] pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, slug…"
            className="w-full bg-[#130f08] border border-admin-border rounded-lg pl-8 pr-3 py-2 text-sm text-admin-foreground placeholder:text-[#3e3020] outline-none focus:border-amber-500/40 transition-colors"
          />
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState filtered={!!search} onClear={() => setSearch("")} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {allCols.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && toggleSort(col.key)}
                    className={cn(
                      "text-left px-4 py-3 text-[10px] font-extrabold tracking-[0.12em] uppercase text-admin-secondary border-b border-admin-border select-none whitespace-nowrap",
                      col.sortable && "cursor-pointer hover:text-admin-primary transition-colors"
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && <SortIcon colKey={col.key} />}
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 border-b border-admin-border w-0" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => {
                const isConfirming = confirmDeleteId === item.id;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-[#130f08] hover:bg-[#130f08] transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Thumb item={item} />
                        <div>
                          <div className="font-semibold text-admin-foreground leading-snug">{item.name}</div>
                          <div className="text-[11px] text-[#3e3020] font-mono mt-0.5">{item.slug}</div>
                        </div>
                      </div>
                    </td>

                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-admin-primary">
                        {col.render ? col.render(item) : item[col.key] ?? "—"}
                      </td>
                    ))}

                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 justify-end">
                        {isConfirming ? (
                          <>
                            <span className="text-[11px] text-admin-primary mr-1">Delete?</span>
                            <button
                              onClick={() => { onDelete(item.id); setConfirmDeleteId(null); }}
                              className="px-2.5 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-400 text-[11px] font-bold transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2.5 py-1 rounded-md bg-admin-border hover:bg-admin-input text-admin-secondary text-[11px] font-bold transition-colors"
                            >
                              No
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => onEdit(item)}
                              className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[11px] font-semibold transition-all"
                            >
                              <Pencil size={11} /> Edit
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(item.id)}
                              className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] transition-all"
                            >
                              <Trash2 size={11} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="px-4 py-2.5 border-t border-admin-border flex items-center justify-between">
            <span className="text-[11px] text-[#3e3020]">
              {sorted.length === items.length
                ? `${items.length} ${items.length === 1 ? "item" : "items"}`
                : `${sorted.length} of ${items.length} items`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


function EmptyState({ filtered, onClear }: { filtered: boolean; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#3e3020]">
      <div className="w-12 h-12 rounded-full bg-[#130f08] border border-admin-border flex items-center justify-center">
        <Icon name="image" size={20} />
      </div>
      <p className="text-sm text-admin-secondary font-medium">
        {filtered ? "No items match your search." : "No items yet. Create your first one."}
      </p>
      {filtered && (
        <button
          onClick={onClear}
          className="text-xs text-amber-500 hover:text-amber-400 underline underline-offset-2"
        >
          Clear search
        </button>
      )}
    </div>
  );
}



function Thumb({ item }: { item: any }) {
  const src = item.main_image?.url;
  if (!src) return (
    <div className="w-8 h-8 rounded-md bg-admin-border border border-admin-input flex items-center justify-center shrink-0">
      <Icon name="image" size={12} />
    </div>
  );
  return (
    <img
      src={src}
      alt={item.name}
      className="w-8 h-8 rounded-md object-cover border border-admin-input shrink-0"
    />
  );
}
