import { FileText } from "lucide-react";
import DocumentItemActions from "./DocumentItemActions";
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
  <SidebarMenuItem className="group">
    <div className="flex items-center gap-1">
      <SidebarMenuButton
        className="flex-1"
      >
        <FileText />

        <span className="truncate">
          {document.title}
        </span>
      </SidebarMenuButton>

      <div
        className="
          opacity-0
          transition-opacity
          group-hover:opacity-100
        "
      >
        <DocumentItemActions
          documentId={
            document._id
          }
        />
      </div>
    </div>
  </SidebarMenuItem>
);
}