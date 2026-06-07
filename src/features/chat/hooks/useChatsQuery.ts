import { useQuery } from "@tanstack/react-query";

import { getChats } from "@/api/chat.api";
import { queryKeys } from "@/lib/query-keys";

export const useChatsQuery = () => {
  return useQuery({
    queryKey: queryKeys.chats.all,
    queryFn: getChats,
  });
};