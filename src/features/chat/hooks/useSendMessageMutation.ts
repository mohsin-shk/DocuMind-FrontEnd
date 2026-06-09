import { useMutation } from "@tanstack/react-query";

import { sendMessage } from "@/api/chat.api";

import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

import type {
  GetChatWithMessagesResponse,
  Message,
} from "@/types/chat.types";

interface MutationContext {
  previousChatData?:
  GetChatWithMessagesResponse;
}

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

      onMutate: async (
        variables
      ): Promise<MutationContext> => {
        await queryClient.cancelQueries({
          queryKey:
            queryKeys.chats.detail(
              variables.chatId
            ),
        });

        const previousChatData =
          queryClient.getQueryData<
            GetChatWithMessagesResponse
          >(
            queryKeys.chats.detail(
              variables.chatId
            )
          );

        if (!previousChatData) {
          return {
            previousChatData,
          };
        }

        const optimisticMessage: Message = {
          _id: `temp-${Date.now()}`,

          chat: variables.chatId,

          role: "user",

          content: variables.content,

          sources: [],

          tokenUsage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0,
          },

          model: "",

          responseTime: 0,

          createdAt:
            new Date().toISOString(),

          updatedAt:
            new Date().toISOString(),
        };

        queryClient.setQueryData<
          GetChatWithMessagesResponse
        >(
          queryKeys.chats.detail(
            variables.chatId
          ),
          {
            ...previousChatData,

            data: {
              ...previousChatData.data,

              messages: [
                ...previousChatData
                  .data.messages,

                optimisticMessage,
              ],
            },
          }
        );

        return {
          previousChatData,
        };
      },

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

                // messages: [
                //   ...oldData.data.messages,

                //   response.data
                //     .userMessage,

                //   response.data
                //     .assistantMessage,
                // ],
                messages: [
                  ...oldData.data.messages.filter(
                    (message) =>
                      !message._id.startsWith(
                        "temp-"
                      )
                  ),

                  response.data.userMessage,

                  response.data.assistantMessage,
                ]
              },
            };
          }
        );

        queryClient.invalidateQueries({
          queryKey:
            queryKeys.chats.all,
        });
      },

      onError: (
        _error,
        variables,
        context
      ) => {
        if (
          context?.previousChatData
        ) {
          queryClient.setQueryData(
            queryKeys.chats.detail(
              variables.chatId
            ),
            context.previousChatData
          );
        }
      },
    });
  };