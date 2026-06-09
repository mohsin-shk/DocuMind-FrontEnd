import { useRef } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  useUploadDocumentMutation,
} from "@/features/documents/hooks/useUploadDocumentMutation";

import type {
  UploadDocumentResponse,
} from "@/types/document.types";

interface DocumentUploadButtonProps {
  onUploadSuccess?: (
    response: UploadDocumentResponse
  ) => void;
}

export default function DocumentUploadButton({
  onUploadSuccess,
}: DocumentUploadButtonProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const uploadMutation =
    useUploadDocumentMutation();

  const handleFileSelect =
    async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      uploadMutation.mutate(
        file,
        {
          onSuccess: (
            response
          ) => {
            onUploadSuccess?.(
              response
            );
          },
        }
      );
    };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="
          .pdf,
          .docx,
          .txt
        "
        hidden
        onChange={
          handleFileSelect
        }
      />

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          inputRef.current?.click()
        }
        disabled={
          uploadMutation.isPending
        }
      >
        <Upload className="mr-2 size-4" />

        {uploadMutation.isPending
          ? "Uploading..."
          : "Upload Document"}
      </Button>
    </>
  );
}