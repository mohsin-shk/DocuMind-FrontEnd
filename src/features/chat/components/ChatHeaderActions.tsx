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

import {
  useDeleteChatMutation,
} from "@/features/chat/hooks/useDeleteChatMutation";

interface ChatHeaderActionsProps {
  chatId: string;
}

export default function ChatHeaderActions({
  chatId,
}: ChatHeaderActionsProps) {
  const deleteChatMutation =
    useDeleteChatMutation();

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
              Delete Chat
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Chat?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently remove
            the conversation and all
            associated messages.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              deleteChatMutation.mutate(
                chatId
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