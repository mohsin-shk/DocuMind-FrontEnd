import ChatComposer from "./ChatComposer";
import ChatDocumentBadges
  from "./ChatDocumentBadges";
import {
  useSendMessageMutation,
} from "@/features/chat/hooks/useSendMessageMutation";
import {
  useChatQuery,
} from "@/features/chat/hooks/useChatQuery";

import MessageList
  from "./MessageList";

interface ChatViewProps {
  chatId: string;
}

export default function ChatView({
  chatId,
}: ChatViewProps) {
  const sendMessageMutation =
    useSendMessageMutation();

  const {
    data,
    isLoading,
    isError,
  } = useChatQuery(chatId);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading chat...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-destructive">
        Failed to load chat.
      </div>
    );
  }

  const chat =
    data?.data.chat;

  const messages =
    data?.data.messages ?? [];

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}

      <div className="border-b px-6 py-4">
        <h2 className="font-semibold">
          {chat?.title}
        </h2>
        <ChatDocumentBadges
          documents={chat?.documents ?? []}
        />
      </div>
      {/* <div className="border-b">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h2 className="font-semibold">
            {chat?.title}
          </h2>
        </div>
      </div> */}

      {/* Messages */}

      <div className="flex-1 min-h-0 p-6">

        <MessageList
          messages={messages}
          isAssistantThinking={
            sendMessageMutation.isPending
          }
        />
      </div>

      <ChatComposer
        chatId={chatId}
        sendMessageMutation={
          sendMessageMutation
        }
      />
    </div>
  );
}