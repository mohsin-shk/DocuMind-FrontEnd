import { useState } from "react";
import { Plus } from "lucide-react";
import type {
  Document,
  UploadDocumentResponse,
} from "@/types/document.types";

import DocumentUploadButton
  from "@/features/documents/components/DocumentUploadButton";

import SelectedDocumentsList from "./SelectedDocumentsList";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DocumentSelector from "./DocumentSelector";


import {
  useCreateChatMutation,
} from "@/features/chat/hooks/useCreateChatMutation";

interface CreateChatDialogProps {
  trigger?: React.ReactNode;
}

export default function CreateChatDialog({
  trigger,
}: CreateChatDialogProps) {
  const [open, setOpen] =
    useState(false);

  const [
    selectedDocumentIds,
    setSelectedDocumentIds,
  ] = useState<string[]>([]);

  const [
    selectedDocuments,
    setSelectedDocuments,
  ] = useState<Document[]>([]);

  const createChatMutation =
    useCreateChatMutation();

  const handleSelectDocument = (
    document: Document
  ) => {
    const documentId =
      document._id;

    const alreadySelected =
      selectedDocumentIds.includes(
        documentId
      );

    if (alreadySelected) {
      setSelectedDocumentIds(
        (previous) =>
          previous.filter(
            (id) =>
              id !== documentId
          )
      );

      setSelectedDocuments(
        (previous) =>
          previous.filter(
            (doc) =>
              doc._id !== documentId
          )
      );

      return;
    }

    if (
      selectedDocumentIds.length >=
      2
    ) {
      return;
    }

    setSelectedDocumentIds(
      (previous) => [
        ...previous,
        documentId,
      ]
    );

    setSelectedDocuments(
      (previous) => [
        ...previous,
        document,
      ]
    );
  };

  const handleCreateChat =
    () => {
      createChatMutation.mutate(
        {
          documentIds:
            selectedDocumentIds,
        }
      );

      setOpen(false);
    };

  const handleUploadSuccess = (
    response: UploadDocumentResponse
  ) => {
    const uploadedDocument =
      response.data;

    const alreadySelected =
      selectedDocumentIds.includes(
        uploadedDocument._id
      );

    if (alreadySelected) {
      return;
    }

    if (
      selectedDocumentIds.length >=
      2
    ) {
      return;
    }

    setSelectedDocumentIds(
      (previous) => [
        ...previous,
        uploadedDocument._id,
      ]
    );

    setSelectedDocuments(
      (previous) => [
        ...previous,
        uploadedDocument,
      ]
    );
  };

  const handleRemoveDocument = (
    documentId: string
  ) => {
    setSelectedDocumentIds(
      (previous) =>
        previous.filter(
          (id) =>
            id !== documentId
        )
    );

    setSelectedDocuments(
      (previous) =>
        previous.filter(
          (document) =>
            document._id !== documentId
        )
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="w-full">
            <Plus className="size-4" />
            New Chat
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create New Chat
          </DialogTitle>

          <DialogDescription>
            Select one or two
            documents to chat
            with.
          </DialogDescription>
        </DialogHeader>

        <SelectedDocumentsList
          documents={
            selectedDocuments
          }
          onRemove={
            handleRemoveDocument
          }
        />

        <DocumentSelector
          selectedDocumentIds={
            selectedDocumentIds
          }
          onSelect={
            handleSelectDocument
          }
        />

        <div className="space-y-2">
          <p className="text-sm font-medium">
            Upload New Document
          </p>

          <DocumentUploadButton
            onUploadSuccess={
              handleUploadSuccess
            }
          />
        </div>

        <Button
          onClick={
            handleCreateChat
          }
          disabled={
            selectedDocumentIds.length ===
            0 ||
            createChatMutation.isPending
          }
        >
          {createChatMutation.isPending
            ? "Creating..."
            : "Create Chat"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}