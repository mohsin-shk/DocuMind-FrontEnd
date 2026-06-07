import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { FileText } from "lucide-react";

import {
  useDocumentsQuery,
} from "@/features/documents/hooks/useDocumentsQuery";

import DocumentListItem
  from "./DocumentListItem";

export default function DocumentSidebarSection() {
  const {
    data,
    isLoading,
    isError,
  } = useDocumentsQuery();

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>
          Documents
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <FileText />

                <span>Loading...</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (isError) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>
          Documents
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <FileText />

                <span>Failed to load</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  const documents =
    data?.data.documents ?? [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Documents ({documents.length})
      </SidebarGroupLabel>

      <SidebarGroupContent>
        {documents.length === 0 ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <FileText />

                <span>
                  No documents uploaded
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            {documents.map((document) => (
              <DocumentListItem
                key={document._id}
                document={document}
              />
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}