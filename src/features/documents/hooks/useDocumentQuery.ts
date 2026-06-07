import { useQuery } from "@tanstack/react-query";

import { getDocument }
  from "@/api/document.api";

import { queryKeys }
  from "@/lib/query-keys";

export const useDocumentQuery = (
  documentId: string
) => {
  return useQuery({
    queryKey:
      queryKeys.documents.detail(
        documentId
      ),

    queryFn: () =>
      getDocument(
        documentId
      ),

    enabled:
      !!documentId,
  });
};