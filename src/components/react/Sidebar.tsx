import React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"


export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType
}

interface AppSidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (item: SidebarItem) => void
}

export function AppSidebar({
  items,
  activeItem,
  onItemClick
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" className="border-r-admin-border">
      <SidebarHeader >
        <div className="px-4 flex items-center gap-2.5 min-h-16">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
            <span className="text-xs font-black text-admin-background">IL</span>
          </div>
          <span className="font-semibold text-sm tracking-[0.04em] whitespace-nowrap overflow-hidden">
            PCA<span className="text-amber-500">HTO</span> Content Manager
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => onItemClick(item)}
                >
                  <SidebarMenuButton
                    className="h-9 cursor-pointer text-muted"
                    tooltip={item.title}
                    isActive={item.url == activeItem}
                  >
                    {item.icon && <item.icon />}
                    <span className="font-medium text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
