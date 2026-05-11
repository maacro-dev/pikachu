import React from "react"

import { ChartBar, EllipsisVertical, Folder, IceCreamBowl, LayoutDashboard, List, LogOut, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType
}

export function AppSidebar({ path, email }: { path: string; email: string; }) {
  const { isMobile } = useSidebar()

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
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton
                    className="h-9 cursor-pointer text-muted"
                    tooltip={item.title}
                    isActive={item.url == path}
                    asChild
                  >
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span className="font-medium text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-xs text-muted-foreground">
                      {email}
                    </span>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Admin</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/api/auth/signout" className="flex items-center gap-2 w-full cursor-pointer" data-astro-reload>
                    <LogOut />
                    Log out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}


const items: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Districts",
    url: "/admin/districts",
    icon: List,
  },
  {
    title: "Municipalities",
    url: "/admin/municipalities",
    icon: ChartBar,
  },
  {
    title: "Attractions",
    url: "/admin/attractions",
    icon: Folder,
  },
  {
    title: "Festivals",
    url: "/admin/festivals",
    icon: Users,
  },
  {
    title: "Foods",
    url: "/admin/foods",
    icon: IceCreamBowl,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Users,
  },
]
