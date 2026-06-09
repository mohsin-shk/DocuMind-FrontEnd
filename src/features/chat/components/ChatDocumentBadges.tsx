import { FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface DocumentRef {
  _id: string;
  title: string;
}

interface ChatDocumentBadgesProps {
  documents: DocumentRef[];
}

export default function ChatDocumentBadges({
  documents,
}: ChatDocumentBadgesProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {documents.map((document) => (
        <Badge
          key={document._id}
          variant="secondary"
          className="gap-1"
        >
          <FileText className="size-3" />

          {document.title}
        </Badge>
      ))}
    </div>
  );
}