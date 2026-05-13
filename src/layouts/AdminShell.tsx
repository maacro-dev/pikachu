import React from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { AppSidebar } from "@/components/react/Sidebar";
import { Topbar } from "@/components/react/Topbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ContentForm from "@/components/react/ContentForm";
import { Drawer } from "@/components/react/Drawer";
import { $adminData, closeDrawer } from "@/lib/store/admin-store";
import { useStore } from "@nanostores/react";
import { pathToSingularLabel } from "@/lib/utils/string";
import { quickFactsToArray } from "@/lib/utils/quick-facts";
import { PATH_MAP } from "@/lib/utils/path";
import { navigate } from "astro:transitions/client";
import { supabase } from "@/lib/supabase";

type Props = {
  path: string;
  email: string;
  children?: React.ReactNode;
};

export default function AdminShell({ path, email, children }: Props) {
  const { data: { districts, municipalities }, drawerOpen, editingItem } = useStore($adminData);

  const drawerTitle = editingItem
    ? `Edit — ${editingItem.name}`
    : `New ${pathToSingularLabel(path)}`;


  const handleSave = async (formData: any) => {
    try {
      const type = PATH_MAP[path];
      const isEditing = !!editingItem;

      const quickFacts = formData.quick_facts
        ? quickFactsToArray(formData.quick_facts)
        : [];

      const payload = {
        action: isEditing ? "update" : "create",
        type,
        data: {
          ...formData,
          quick_facts: quickFacts,
          ...(isEditing && {
            content_id: editingItem.content_id,
            ...(type === "district" && { district_id: editingItem.id }),
            ...(type === "municipality" && { municipality_id: editingItem.id }),
            ...(
              ["attractions", "foods", "festivals", "events"].includes(type) && {
                municipality_id: editingItem.municipality_id,
              }
            ),
          }),
        },
      };

      // Call the Edge Function via the Supabase client
      const { data, error } = await supabase.functions.invoke("save-content", {
        body: payload,
      });

      if (error) {
        throw new Error(error.message || "Save failed");
      }

      navigate(window.location.pathname, { history: "replace" });
      closeDrawer();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save. Check console for details.");
    }
  };


  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar path={path} email={email} />
        <SidebarInset className="flex flex-col min-h-0 relative">
          <Topbar section="Admin" />
          <main className="flex-1 overflow-y-auto px-6 py-8 relative">
            {children}
            <div id="loading-overlay" className="loading-overlay">
              <div className="spinner"></div>
            </div>
          </main>
        </SidebarInset>
        <Drawer open={drawerOpen} title={drawerTitle} onClose={closeDrawer}>
          <ContentForm
            key={editingItem?.id ?? "new"}
            initialData={editingItem ?? {}}
            type={getTypeForSection(path)}
            districts={districts ?? []}
            municipalities={municipalities ?? []}
            onSave={handleSave}
            onCancel={closeDrawer}
          />
        </Drawer>
      </SidebarProvider>
    </TooltipProvider>
  );
}

const SECTION_TYPE_MAP: Record<string, string> = {
  districts: "district",
  municipalities: "municipality",
  attractions: "attractions",
  festivals: "festivals",
  foods: "foods",
  events: "events",
};

const getTypeForSection = (s: string) => SECTION_TYPE_MAP[s] ?? s;

