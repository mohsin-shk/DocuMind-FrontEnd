import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import DocumentUploadButton
  from "@/features/documents/components/DocumentUploadButton";

import CreateChatDialog
  from "@/features/chat/components/CreateChatDialog";

export default function WorkspaceEmptyState() {
  return (
    <div
      className="
        flex
        h-full
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-xl
          text-center
        "
      >
        <div
          className="
            mb-6
            flex
            justify-center
          "
        >
          <div
            className="
              flex
              size-16
              items-center
              justify-center
              rounded-full
              border
            "
          >
            <FileText className="size-8" />
          </div>
        </div>

        <h2
          className="
            text-3xl
            font-semibold
          "
        >
          Welcome to DocuMind
        </h2>

        <p
          className="
            mt-3
            text-muted-foreground
          "
        >
          Upload a PDF, DOCX or TXT
          document and start chatting
          with AI instantly.
        </p>

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            gap-4
          "
        >
          <DocumentUploadButton />

          <div
            className="
              text-sm
              text-muted-foreground
            "
          >
            or
          </div>

          <CreateChatDialog
            trigger={
              <Button>
                Create Chat
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}