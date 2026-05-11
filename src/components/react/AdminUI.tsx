import React from "react";
import { useState } from "react";
import { useAdminData } from "@/lib/hooks/useAdminData";
import { Drawer } from "./Drawer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar, type SidebarItem } from "./Sidebar";
import { TooltipProvider } from "../ui/tooltip";
import { Dashboard } from "./Dashboard";
import ContentForm from "./ContentForm";
import { cn } from "@/lib/utils";
import { SectionView } from "./SectionView";
import { TypeBadge } from "./TypeBadge";
import type { District } from "@/lib/schemas/district.schema";
import { quickFactsToArray } from "@/lib/utils/quick-facts";
import { SupabaseAPI } from "@/lib/api/Supabase";
import { Topbar } from "./Topbar";


type Section =
  | "dashboard"
  | "districts"
  | "municipalities"
  | "attractions"
  | "foods"
  | "festivals"
  | "events";


const SECTION_TYPE_MAP: Record<string, string> = {
  districts: "district",
  municipalities: "municipality",
  attractions: "attractions",
  festivals: "festivals",
  foods: "foods",
  events: "events",
};

const getTypeForSection = (section: string) =>
  SECTION_TYPE_MAP[section] ?? section;

const singularize = (s: string) =>
  s.endsWith("ies") ? s.slice(0, -3) + "y" : s.replace(/s$/, "");




export default function AdminUI() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const { loading, error, ...data } = useAdminData();

  const allContent = [
    ...(data.attractions ?? []),
    ...(data.foods ?? []),
    ...(data.festivals ?? []),
    ...(data.events ?? []),
  ];


  const sectionItems: Record<string, any[]> = {
    districts: data.districts ?? [],
    municipalities: data.municipalities ?? [],
    attractions: data.attractions ?? [],
    foods: data.foods ?? [],
    festivals: data.festivals ?? [],
    events: data.events ?? [],
  };

  const getItems = (section: string) => sectionItems[section] ?? [];

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

  const openNew = () => { setEditingItem(null); setDrawerOpen(true); };
  const openEdit = (item: any) => { setEditingItem(item); setDrawerOpen(true); };
  const closeDrawer = () => { setDrawerOpen(false); setEditingItem(null); };

  const handleSave = async (formData: any) => {
    try {
      const type = getTypeForSection(activeSection);
      const isEditing = !!editingItem;

      const quickFacts = formData.quick_facts
        ? quickFactsToArray(formData.quick_facts)
        : [];

      const base = { ...formData, quick_facts: quickFacts };

      if (type === "district") {
        if (isEditing) {
          await SupabaseAPI.admin.updateDistrict(editingItem.content_id, editingItem.id, base);
        } else {
          await SupabaseAPI.admin.createDistrict(base);
        }
      } else if (type === "municipality") {
        if (isEditing) {
          await SupabaseAPI.admin.updateMunicipality(editingItem.content_id, editingItem.id, base);
        } else {
          await SupabaseAPI.admin.createMunicipality(base);
        }
      } else {
        const contentType = type as "attractions" | "foods" | "festivals" | "events";
        if (isEditing) {
          await SupabaseAPI.admin.updateContent(contentType, editingItem.content_id, editingItem.id, base);
        } else {
          await SupabaseAPI.admin.createContent(contentType, base);
        }
      }

      window.location.reload();
      closeDrawer();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save. Check the console for details.");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      const type = getTypeForSection(activeSection);
      if (type === "district") {
        await SupabaseAPI.admin.deleteDistrict(String(id));
      } else if (type === "municipality") {
        await SupabaseAPI.admin.deleteMunicipality(String(id));
      } else {
        await SupabaseAPI.admin.deleteContent(
          type as "attractions" | "foods" | "festivals" | "events",
          String(id)
        );
      }
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete. Check the console for details.");
    }
  };

  const currentNav = items.find((n) => n.url === activeSection);
  const drawerTitle = editingItem
    ? `Edit — ${editingItem.name}`
    : `New ${singularize(currentNav?.title ?? activeSection)}`;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0702]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <p className="text-[13px] text-[#3e3020]">Loading…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0702]">
        <div className="flex flex-col items-center gap-3 text-center max-w-xs">
          <div className="text-red-400 text-sm font-semibold">Failed to load data</div>
          <p className="text-[12px] text-admin-secondary">{String(error)}</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          activeItem={activeSection}
          onItemClick={(item: SidebarItem) => setActiveSection(item.url as Section)}
        />

        <SidebarInset className="flex flex-col min-h-0">
          <Topbar section={activeSection} />

          <main className="flex-1 overflow-y-auto px-6 py-8">
            {activeSection === "dashboard" ? (
              <Dashboard
                districts={data.districts ?? []}
                municipalities={data.municipalities ?? []}
                content={allContent}
              />
            ) : (
              <SectionView
                title={currentNav?.title ?? activeSection}
                type={getTypeForSection(activeSection)}
                items={getItems(activeSection)}
                onEdit={openEdit}
                onDelete={handleDelete}
                onNew={openNew}
                columns={sectionColumns[activeSection] ?? sectionColumns.default}
              />
            )}
          </main>
        </SidebarInset>

        <Drawer open={drawerOpen} title={drawerTitle} onClose={closeDrawer}>
          <ContentForm
            key={editingItem?.id ?? "new"}
            initialData={editingItem ?? {}}
            type={getTypeForSection(activeSection)}
            districts={data.districts ?? []}
            municipalities={data.municipalities ?? []}
            onSave={handleSave}
            onCancel={closeDrawer}
          />
        </Drawer>
      </SidebarProvider>
    </TooltipProvider>
  );
}
