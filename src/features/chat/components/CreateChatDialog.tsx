import { useState } from "react";
import { Plus } from "lucide-react";

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
import SelectedDocumentBadge from "./SelectedDocumentBadge";

import {
  useCreateChatMutation,
} from "@/features/chat/hooks/useCreateChatMutation";

export default function CreateChatDialog() {
  const [open, setOpen] =
    useState(false);

  const [
    selectedDocumentIds,
    setSelectedDocumentIds,
  ] = useState<string[]>([]);

  const createChatMutation =
    useCreateChatMutation();

  const handleSelectDocument = (
    documentId: string
  ) => {
    setSelectedDocumentIds(
      (previous) => {
        if (
          previous.includes(
            documentId
          )
        ) {
          return previous.filter(
            (id) =>
              id !== documentId
          );
        }

        if (
          previous.length >= 2
        ) {
          return previous;
        }

        return [
          ...previous,
          documentId,
        ];
      }
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

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="size-4" />
          New Chat
        </Button>
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

        <SelectedDocumentBadge
          count={
            selectedDocumentIds.length
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