import ChatComposer from "./ChatComposer";

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
    <div className="flex h-full flex-col">
      {/* Header */}

      <div className="border-b px-6 py-4">
        <h2 className="font-semibold">
          {chat?.title}
        </h2>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6">
        <MessageList
          messages={messages}
        />
      </div>

      <ChatComposer
        chatId={chatId}
      />
    </div>
  );
}