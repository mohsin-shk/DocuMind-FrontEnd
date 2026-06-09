import { FileText, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type {
  Document,
} from "@/types/document.types";

interface SelectedDocumentsListProps {
  documents: Document[];

  onRemove: (
    documentId: string
  ) => void;
}

export default function SelectedDocumentsList({
  documents,
  onRemove,
}: SelectedDocumentsListProps) {
  if (documents.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Select 1 or 2 documents
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {documents.map(
        (document) => (
          <Badge
            key={document._id}
            variant="secondary"
            className="gap-2"
          >
            <FileText className="size-3" />

            {document.title}

            <button
              type="button"
              onClick={() =>
                onRemove(
                  document._id
                )
              }
            >
              <X className="size-3" />
            </button>
          </Badge>
        )
      )}
    </div>
  );
}