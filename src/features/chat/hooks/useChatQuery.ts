import { useQuery } from "@tanstack/react-query";

import { getChat } from "@/api/chat.api";
import { queryKeys } from "@/lib/query-keys";

export const useChatQuery = (
  chatId: string
) => {
  return useQuery({
    queryKey:
      queryKeys.chats.detail(chatId),

    queryFn: () =>
      getChat(chatId),

    enabled: !!chatId,
  });
};