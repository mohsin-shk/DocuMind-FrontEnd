import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import type {
  Document,
} from "@/types/document.types";
import {
  useDocumentsQuery,
} from "@/features/documents/hooks/useDocumentsQuery";

interface DocumentSelectorProps {
  selectedDocumentIds: string[];

  onSelect: (
    document: Document
  ) => void;
}

export default function DocumentSelector({
  selectedDocumentIds,
  onSelect,
}: DocumentSelectorProps) {
  const {
    data,
    isLoading,
    isError,
  } = useDocumentsQuery();

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading documents...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Failed to load documents
      </p>
    );
  }

  const documents =
    data?.data.documents ?? [];

  if (documents.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No documents available
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((document) => {
        const isSelected =
          selectedDocumentIds.includes(
            document._id
          );

        return (
          <Button
            key={document._id}
            type="button"
            variant={
              isSelected
                ? "default"
                : "outline"
            }
            className="w-full justify-start"
            onClick={() =>
              onSelect(
                document
              )
            }
          >
            <FileText />

            <span className="truncate">
              {document.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
}