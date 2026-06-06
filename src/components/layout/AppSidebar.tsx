import {
  FileText,
  MessageSquare,
  Plus,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* ========================================
          HEADER
      ======================================== */}

      <SidebarHeader className="gap-4">
        <div className="px-2">
          <h1 className="text-lg font-semibold">
            DocuMind
          </h1>

          <p className="text-xs text-muted-foreground">
            AI Document Intelligence
          </p>
        </div>

        <Button className="w-full">
          <Plus className="size-4" />
          New Chat
        </Button>
      </SidebarHeader>

      {/* ========================================
          CONTENT
      ======================================== */}

      <SidebarContent>
        {/* Documents */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Documents
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  <FileText />
                  <span>
                    No documents yet
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chats */}

        <SidebarGroup>
          <SidebarGroupLabel>
            Chats
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  <MessageSquare />
                  <span>
                    No chats yet
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ========================================
          FOOTER
      ======================================== */}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}