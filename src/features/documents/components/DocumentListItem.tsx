import { FileText } from "lucide-react";

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type {
  Document,
} from "@/types/document.types";

interface DocumentListItemProps {
  document: Document;
}

export default function DocumentListItem({
  document,
}: DocumentListItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <FileText />

        <span className="truncate">
          {document.title}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}