import React from 'react';
import { navigate } from "astro:transitions/client";
import { Plus } from "lucide-react";
import { ContentTable } from './ContentTable';
import { useStore } from '@nanostores/react';
import { $adminData, openDrawer } from '@/lib/store/admin-store';
import { pathToSingularLabel } from '@/lib/utils/string';
import { PATH_MAP } from '@/lib/utils/path';
import { SupabaseAPI } from '@/lib/api/Supabase';
import type { District } from '@/lib/schemas/district.schema';
import { TypeBadge } from './TypeBadge';

interface Props {
  path: string;
  type: "districts" | "municipalities" | "attractions" | "festivals" | "foods" | "events"
}



export function SectionView({ path, type }: Props) {

  const { data } = useStore($adminData);

  const singular = pathToSingularLabel(path);

  const items = data[type]

  const sectionColumns: Record<string, any[]> = {
    districts: [
      { key: "tagline", label: "Tagline", render: (d: any) => d.tagline || "—" },
      {
        key: "display_order", label: "Order", sortable: true, render: (d: any) => (
          <span className="font-mono text-admin-secondary">#{d.display_order ?? "—"}</span>
        )
      },
    ],
    municipalities: [
      {
        key: "district", label: "District", render: (m: any) => {
          const district = (data.districts ?? []).find((d: any) => d.id === m.district_id) as unknown as District;
          return district?.name ?? "—";
        }
      },
    ],
    attractions: [
      { key: "type", label: "Type", render: (i: any) => <TypeBadge type={i.type} /> },
    ],
    foods: [
      { key: "food_type", label: "Type", render: (i: any) => <TypeBadge type={i.food_type} /> },
    ],
    festivals: [
      {
        key: "date", label: "Date", sortable: true, render: (i: any) => (
          i.date
            ? new Date(i.date).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })
            : "—"
        )
      },
    ],
    events: [
      {
        key: "date", label: "Date", sortable: true, render: (i: any) => (
          i.date
            ? new Date(i.date).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })
            : "—"
        )
      },
      { key: "venue", label: "Venue", render: (i: any) => i.venue || "—" },
    ],
    default: [],
  };


  const handleDelete = async (id: string | number) => {
    try {
      const type = PATH_MAP[path];
      if (type === "district") {
        await SupabaseAPI.admin.deleteDistrict(String(id));
      } else if (type === "municipality") {
        await SupabaseAPI.admin.deleteMunicipality(String(id));
      } else {
        await SupabaseAPI.admin.deleteContent(
          type as "attractions" | "foods" | "festivals" | "events",
          String(id),
        );
      }
      navigate(window.location.pathname, { history: 'replace' });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete. Check the console for details.");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-admin-foreground leading-none">{path}</h1>
          <p className="text-[13px] text-[#3e3020] mt-1.5">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          onClick={() => openDrawer()}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#1a1208] px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
        >
          <Plus size={14} /> New {singular}
        </button>
      </div>

      <div className="bg-[#0f0b06] rounded-xl border border-admin-border overflow-hidden">
        <ContentTable
          items={items}
          onEdit={(item) => openDrawer(item)}
          onDelete={handleDelete}
          columns={sectionColumns[type]}
        />
      </div>
    </div>
  );
}
