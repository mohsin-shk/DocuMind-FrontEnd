import {
  useRef,
} from "react";

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
}

export default function MessageList({
  messages,
}: MessageListProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useAutoScroll(
    containerRef,
    messages.length
  );

  return (
    <div  ref={containerRef}
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
      </div>
    </div>
  );
}