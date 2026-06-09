import {
  useState,
} from "react";

import { Send } from "lucide-react";

import { Button }
  from "@/components/ui/button";

import { Textarea }
  from "@/components/ui/textarea";

import type {
  UseMutationResult,
} from "@tanstack/react-query";

import type {
  SendMessageResponse,
} from "@/types/chat.types";

interface ChatComposerProps {
  chatId: string;
  sendMessageMutation:
    UseMutationResult<
      SendMessageResponse,
      Error,
      {
        chatId: string;
        content: string;
      }
    >;
}

export default function ChatComposer({
  chatId,
  sendMessageMutation
}: ChatComposerProps) {

  const [content, setContent] =
    useState("");

  // const sendMessageMutation =
  //   useSendMessageMutation();

  const handleSubmit = () => {
    const trimmed =
      content.trim();

    if (!trimmed) {
      return;
    }

    sendMessageMutation.mutate({
      chatId,
      content: trimmed,
    });

    setContent("");
  };

  return (
    <div className="border-t p-4">
      <div className="mx-auto max-w-5xl">
      <div className="flex gap-2">
        <Textarea
          value={content}
          onChange={(event) =>
            setContent(
              event.target.value
            )
          }
          placeholder="Ask anything about your documents..."
          className="min-h-15"
        />

        <Button
          onClick={handleSubmit}
          disabled={
            sendMessageMutation.isPending
          }
        >
          <Send />
        </Button>
      </div>
      </div>
    </div>
  );
}