import {
  // FileText,
  // MessageSquare,
  // Plus,
  Settings,
} from "lucide-react";

// import { Button } from "@/components/ui/button";
import CreateChatDialog from "@/features/chat/components/CreateChatDialog";
import ChatSidebarSection from "@/features/chat/components/ChatSidebarSection";

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
import DocumentSidebarSection
  from "@/features/documents/components/DocumentSidebarSection";

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

        {/* <Button className="w-full">
          <Plus className="size-4" />
          New Chat
        </Button> */}
        <CreateChatDialog />
      </SidebarHeader>

      {/* ========================================
          CONTENT
      ======================================== */}

      <SidebarContent>
        {/* Documents */}
        <DocumentSidebarSection/>

        {/* Chats */}

        <ChatSidebarSection />
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