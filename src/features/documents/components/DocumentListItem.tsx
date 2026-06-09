import { FileText } from "lucide-react";
import { Link, useParams }
  from "react-router-dom";
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
  const { documentId } =
    useParams();

  const isActive =
    documentId === document._id;
  return (
    <SidebarMenuItem className="group">
      <div className="flex items-center gap-1">
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className="flex-1"
        >
          <Link
            to={`/documents/${document._id}`}
          >
            <FileText />

            <span className="truncate">
              {document.title}
            </span>
          </Link>
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