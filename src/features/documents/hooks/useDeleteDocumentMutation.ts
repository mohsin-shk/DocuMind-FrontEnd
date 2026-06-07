import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteDocument } from "@/api/document.api";

import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

import { getErrorMessage } from "@/lib/error-message";

export const useDeleteDocumentMutation =
  () => {
    return useMutation({
      mutationFn: deleteDocument,

      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey:
            queryKeys.documents.all,
        });

        toast.success(
          response.message
        );
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(error)
        );
      },
    });
  };