import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { deleteChat } from "@/api/chat.api";

import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { getErrorMessage } from "@/lib/error-message";

export const useDeleteChatMutation =
  () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: deleteChat,

      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey:
            queryKeys.chats.all,
        });

        toast.success(
          response.message
        );

        navigate("/", {
          replace: true,
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(error)
        );
      },
    });
  };