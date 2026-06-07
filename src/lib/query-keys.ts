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
  }
};
