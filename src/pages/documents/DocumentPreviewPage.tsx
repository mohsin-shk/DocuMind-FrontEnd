import { useParams } from "react-router-dom";

import {
  useDocumentQuery,
} from "@/features/documents/hooks/useDocumentQuery";

import DocumentMetadataCard
  from "@/features/documents/components/DocumentMetadataCard";

import DocumentPreview
  from "@/features/documents/components/DocumentPreview";

export default function DocumentPreviewPage() {
  const { documentId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } = useDocumentQuery(
    documentId ?? ""
  );

  if (isLoading) {
    return (
      <div className="p-6">
        Loading document...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-destructive">
        Failed to load document.
      </div>
    );
  }

  const document =
    data.data;

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <DocumentMetadataCard
          document={document}
        />

        <DocumentPreview
          document={document}
        />
      </div>
    </div>
  );
}