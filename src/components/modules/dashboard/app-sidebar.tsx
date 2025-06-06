import { SquarePen,NotebookPen,BookPlus,HousePlus  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Admin",
    url: "/admin",
    icon: HousePlus ,
  },
  {
    title: "Blogs Management",
    url: "/admin/blogs",
    icon: NotebookPen ,
  },
  {
    title: "Projects Management",
    url: "/admin/projects",
    icon: BookPlus ,
  },
  {
    title: "Skills Management",
    url: "/admin/skills",
    icon: SquarePen ,
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-3 uppercase text-md tracking-wide px-3 pt-4"> 
            ADMIN dashboard
            </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
