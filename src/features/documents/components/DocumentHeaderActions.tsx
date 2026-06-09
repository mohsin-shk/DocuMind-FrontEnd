import {
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { useDeleteDocumentMutation } from "../hooks/useDeleteDocumentMutation";

interface DocumentHeaderActionsProps {
  documentId: string;
}

export default function DocumentHeaderActions({
  documentId,
}: DocumentHeaderActionsProps) {
  const deleteDocumentMutation =
  useDeleteDocumentMutation();

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
        >
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) =>
                event.preventDefault()
              }
              className="text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Delete Document
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Document?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently remove
            the document and all
            the context associated to this document.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              deleteDocumentMutation.mutate(
                documentId
              )
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}