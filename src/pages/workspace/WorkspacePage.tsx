import { useParams } from "react-router-dom";

import ChatView from "@/features/chat/components/ChatView";

export default function WorkspacePage() {
  const { chatId } =
    useParams();

  if (!chatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Welcome to DocuMind
          </h2>

          <p className="mt-2 text-muted-foreground">
            Select a chat or create a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ChatView
      chatId={chatId}
    />
  );
}