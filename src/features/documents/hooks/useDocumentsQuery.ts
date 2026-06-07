import { useQuery } from "@tanstack/react-query";

import { getDocuments }
  from "@/api/document.api";

import { queryKeys }
  from "@/lib/query-keys";

export const useDocumentsQuery =
  () => {
    return useQuery({
      queryKey:
        queryKeys.documents.all,

      queryFn:
        getDocuments,
    });
  };