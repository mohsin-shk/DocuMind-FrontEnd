import { MessageSquare } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ChatItemActions from "./ChatItemActions";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type {
  ChatListItem as ChatListItemType,
} from "@/types/chat.types";

interface ChatListItemProps {
  chat: ChatListItemType;
}

export default function ChatListItem({
  chat,
}: ChatListItemProps) {
  const { chatId } = useParams();

  const isActive =
    chatId === chat._id;

  return (
    <SidebarMenuItem className="group">
      <div className="flex items-center gap-1">
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className="flex-1"
        >
          <Link
            to={`/chat/${chat._id}`}
          >
            <MessageSquare />

            <span className="truncate">
              {chat.title}
            </span>

          </Link>
        </SidebarMenuButton>
        <div
          className="
          opacity-0
          transition-opacity
          group-hover:opacity-100
        "
        >
          <ChatItemActions
            chatId={chat._id}
          />
        </div>

      </div>
    </SidebarMenuItem>
  );
}