"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutButton } from "../auth/LogoutButton";
import { navbarRoutes } from "@/data/navbar-routes";
import { Logo } from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="bg-sidebar-background">
      <SidebarHeader className="inline-flex flex-row items-center justify-between w-full group-data-[collapsible=icon]:justify-center">
        <Logo
          size="medium"
          aspectRatio={2}
          className="group-data-[collapsible=icon]:hidden"
        />
        <SidebarTrigger className="cursor-pointer size-12" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbarRoutes.length > 0 &&
                navbarRoutes.map(route => (
                  <SidebarMenuItem
                    key={route.title}
                    className="w-full group-data-collapsible:flex group-data-collapsible:items-center group-data-collapsible:justify-center"
                  >
                    <SidebarMenuButton
                      size={"lg"}
                      asChild
                      isActive={pathname === route.url}
                      className="[&>svg]:size-4 [&>span]:text-base group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:[&>svg]:size-5"
                    >
                      <Link href={route.url}>
                        <route.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {route.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
