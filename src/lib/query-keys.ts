export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  documents: {
    all: ["documents"] as const,

    detail: (
      documentId: string
    ) =>
      [
        "documents",
        documentId,
      ] as const,
  },
  chats: {
  all: ["chats"] as const,

  detail: (chatId: string) =>
    ["chats", chatId] as const,
},
};
