import { useMutation } from "@tanstack/react-query";

import { sendMessage } from "@/api/chat.api";

import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

import type {
  GetChatWithMessagesResponse,
} from "@/types/chat.types";

interface SendMessageVariables {
  chatId: string;
  content: string;
}

export const useSendMessageMutation =
  () => {
    return useMutation({
      mutationFn: ({
        chatId,
        content,
      }: SendMessageVariables) =>
        sendMessage(chatId, {
          content,
        }),

      onSuccess: (
        response,
        variables
      ) => {
        queryClient.setQueryData<
          GetChatWithMessagesResponse
        >(
          queryKeys.chats.detail(
            variables.chatId
          ),
          (oldData) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,

              data: {
                ...oldData.data,

                messages: [
                  ...oldData.data.messages,

                  response.data
                    .userMessage,

                  response.data
                    .assistantMessage,
                ],
              },
            };
          }
        );

        queryClient.invalidateQueries({
          queryKey:
            queryKeys.chats.all,
        });
      },
    });
  };