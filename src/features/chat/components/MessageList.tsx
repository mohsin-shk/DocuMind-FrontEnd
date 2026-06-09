import {
  useRef,
} from "react";

import AssistantThinking
  from "./AssistantThinking";

import type {
  Message,
} from "@/types/chat.types";

import MessageBubble
  from "./MessageBubble";

import {
  useAutoScroll,
} from "@/hooks/useAutoScroll";


interface MessageListProps {
  messages: Message[];
  isAssistantThinking?: boolean;
}

export default function MessageList({
  messages,
  isAssistantThinking = false,
}: MessageListProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useAutoScroll(
    containerRef,
    messages.length
  );

  return (
    <div ref={containerRef}
      className="
        
        overflow-y-auto
        h-full
        pr-6
         py-8
      ">
      <div className="mx-auto w-full max-w-5xl flex flex-col gap-8">
        {messages.map(
          (message) => (
            <MessageBubble
              key={message._id}
              message={message}
            />
          )
        )}
        {isAssistantThinking && (
          <AssistantThinking />
        )}
      </div>
    </div>
  );
}