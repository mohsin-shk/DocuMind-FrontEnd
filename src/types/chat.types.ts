// ---- Nested Chat Interfaces ----

export interface ChatDocumentRef {
  _id: string;
  title: string;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface MessageSource {
  documentId: string;
  title: string;
  _id: string;
}

// ---- Core Message Type ----

export interface Message {
  _id: string;
  chat: string;
  role: "user" | "assistant";
  content: string;
  sources: MessageSource[];
  tokenUsage: TokenUsage;
  model: string;
  responseTime: number;
  createdAt: string;
  updatedAt: string;
}

// ---- Last Message Preview (used in chat list) ----

export interface LastMessage {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

// ---- Core Chat Type ----
// Full chat object returned by create/delete

export interface Chat {
  _id: string;
  owner: string;
  title: string;
  documents: string[] | ChatDocumentRef[];
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

// Chat shape returned by get all chats (sidebar)
// documents are populated objects, has extra fields

export interface ChatListItem {
  _id: string;
  title: string;
  documents: ChatDocumentRef[];
  documentCount: number;
  lastMessage: LastMessage | null;
  lastMessageAt: string;
  createdAt: string;
}

// ---- Request Payloads ----

export interface CreateChatPayload {
  documentIds: string[]; // min 1, max 2
}

export interface SendMessagePayload {
  content: string;
}

// ---- API Success Responses ----

export interface CreateChatResponse {
  statusCode: number;
  data: Chat;
  message: string;
  success: boolean;
}

export interface GetAllChatsResponse {
  statusCode: number;
  data: ChatListItem[];
  message: string;
  success: boolean;
}

export interface GetChatWithMessagesResponse {
  statusCode: number;
  data: {
    chat: ChatListItem;
    messages: Message[];
  };
  message: string;
  success: boolean;
}

export interface SendMessageResponse {
  statusCode: number;
  data: {
    chatId: string;
    userMessage: Message;
    assistantMessage: Message;
  };
  message: string;
  success: boolean;
}

export interface DeleteChatResponse {
  statusCode: number;
  data: Chat;
  message: string;
  success: boolean;
}