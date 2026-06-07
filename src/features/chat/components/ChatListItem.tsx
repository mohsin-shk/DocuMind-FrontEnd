import { MessageSquare } from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
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
    </SidebarMenuItem>
  );
}