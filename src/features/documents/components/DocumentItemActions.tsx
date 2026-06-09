import {
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Button }
  from "@/components/ui/button";

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

import {
  useDeleteDocumentMutation,
} from "@/features/documents/hooks/useDeleteDocumentMutation";

interface DocumentItemActionsProps {
  documentId: string;
}

export default function DocumentItemActions({
  documentId,
}: DocumentItemActionsProps) {
  const deleteDocumentMutation =
    useDeleteDocumentMutation();

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="
              size-7
              text-muted-foreground
            "
          >
            <MoreHorizontal className="size-4" />
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
            the document, vectors and
            associated metadata.
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