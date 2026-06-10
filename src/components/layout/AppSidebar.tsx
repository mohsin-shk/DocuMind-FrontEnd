import { Link } from "react-router-dom";
import {
  Upload,
  // FileText,
  // MessageSquare,
  Plus,
  Settings,
} from "lucide-react";
import logo from "/src/assets/documind_logo.png"
// import { Button } from "@/components/ui/button";
import CreateChatDialog from "@/features/chat/components/CreateChatDialog";
import ChatSidebarSection from "@/features/chat/components/ChatSidebarSection";
import DocumentUploadButton
  from "@/features/documents/components/DocumentUploadButton";
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
        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <Link to="/">
            <h1 className="text-lg font-semibold">
              DocuMind
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground">
            AI Document Intelligence
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <DocumentUploadButton
            buttonText="Upload"
            variant="outline"
          />
          <CreateChatDialog />
        </div>
      </SidebarHeader>

      {/* ========================================
          CONTENT
      ======================================== */}

      <SidebarContent>
        {/* Documents */}
        <DocumentSidebarSection />

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