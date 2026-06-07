import { MessageSquare } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useChatsQuery }
  from "@/features/chat/hooks/useChatsQuery";

import ChatListItem
  from "./ChatListItem";

export default function ChatSidebarSection() {
  const {
    data,
    isLoading,
    isError,
  } = useChatsQuery();

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>
          Chats
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <MessageSquare />
                <span>
                  Loading...
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (isError) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>
          Chats
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <MessageSquare />
                <span>
                  Failed to load
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  const chats =
    data?.data ?? [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Chats ({chats.length})
      </SidebarGroupLabel>

      <SidebarGroupContent>
        {chats.length === 0 ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <MessageSquare />
                <span>
                  No chats yet
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            {chats.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
              />
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}