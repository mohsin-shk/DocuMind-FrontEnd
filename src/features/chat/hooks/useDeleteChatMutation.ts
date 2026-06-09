import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { deleteChat } from "@/api/chat.api";
import {
  useLocation,
} from "react-router-dom";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { getErrorMessage } from "@/lib/error-message";

export const useDeleteChatMutation =
  () => {
    const location =
      useLocation();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: deleteChat,

      onSuccess: (
        response,
        deletedChatId
      ) => {
        queryClient.setQueryData(
          queryKeys.chats.all,
          (oldData: any) => {
            if (!oldData) {
              return oldData;
            }

            return {
              ...oldData,
              data: oldData.data.filter(
                (chat: { _id: string }) =>
                  chat._id !== deletedChatId
              ),
            };
          }
        );

        queryClient.removeQueries({
          queryKey:
            queryKeys.chats.detail(
              deletedChatId
            ),
        });

        toast.success(
          response.message
        );

        if (
          location.pathname ===
          `/chat/${deletedChatId}`
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