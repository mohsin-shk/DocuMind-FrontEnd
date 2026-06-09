import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { deleteDocument } from "@/api/document.api";

import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { getErrorMessage } from "@/lib/error-message";

export const useDeleteDocumentMutation =
  () => {
    const navigate = useNavigate();

    const location = useLocation();

    return useMutation({
      mutationFn: deleteDocument,

      onSuccess: (
        response,
        deletedDocumentId
      ) => {
        queryClient.setQueryData(
          queryKeys.documents.all,
          (oldData: any) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,

              data: {
                ...oldData.data,

                documents:
                  oldData.data.documents.filter(
                    (
                      document: {
                        _id: string;
                      }
                    ) =>
                      document._id !==
                      deletedDocumentId
                  ),

                count:
                  oldData.data.count -
                  1,
              },
            };
          }
        );

        queryClient.removeQueries({
          queryKey:
            queryKeys.documents.detail(
              deletedDocumentId
            ),
        });

        toast.success(
          response.message
        );
        if (
          location.pathname ===
          `/documents/${deletedDocumentId}`
        ) {
          navigate("/", {
            replace: true,
          });
        }
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(error)
        );
      },
    });
  };