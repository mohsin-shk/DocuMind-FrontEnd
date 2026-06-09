
import {
  formatMessageTime,
} from "../utils/format-message-time";

import type {
  Message,
} from "@/types/chat.types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex ${isUser
        ? "justify-end"
        : "justify-start"
        }`}
    >
      <div
        className={`
          max-w-[75%]
          rounded-xl
          px-4
          py-3
          whitespace-pre-wrap
          ${isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border"
          }
        `}
      >
        {message.content}
        <div
          className="
    mt-2
    text-xs
    opacity-70
  "
        >
          {formatMessageTime(
            message.createdAt
          )}
        </div>
      </div>

    </div>
  );
}