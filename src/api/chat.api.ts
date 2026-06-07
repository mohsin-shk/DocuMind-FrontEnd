import { apiClient } from "@/api/client";

import type {
  CreateChatPayload,
  CreateChatResponse,
  SendMessagePayload,
  SendMessageResponse,
  GetAllChatsResponse,
  GetChatWithMessagesResponse,
  DeleteChatResponse,
} from "@/types/chat.types";

export const createChat = async (
  payload: CreateChatPayload
): Promise<CreateChatResponse> => {
  const response = await apiClient.post(
    "/chats",
    payload
  );

  return response.data;
};

export const sendMessage = async (
  chatId: string,
  payload: SendMessagePayload
): Promise<SendMessageResponse> => {
  const response = await apiClient.post(
    `/chats/${chatId}/messages`,
    payload
  );

  return response.data;
};

export const getChats =
  async (): Promise<GetAllChatsResponse> => {
    const response =
      await apiClient.get("/chats");

    return response.data;
  };

export const getChat =
  async (
    chatId: string
  ): Promise<GetChatWithMessagesResponse> => {
    const response =
      await apiClient.get(
        `/chats/${chatId}/messages`
      );

    return response.data;
  };

export const deleteChat =
  async (
    chatId: string
  ): Promise<DeleteChatResponse> => {
    const response =
      await apiClient.delete(
        `/chats/${chatId}`
      );

    return response.data;
  };