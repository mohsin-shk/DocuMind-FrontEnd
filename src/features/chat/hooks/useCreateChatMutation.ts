import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createChat } from "@/api/chat.api";

import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { getErrorMessage } from "@/lib/error-message";

export const useCreateChatMutation =
  () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: createChat,

      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey:
            queryKeys.chats.all,
        });

        toast.success(
          response.message
        );

        navigate(
          `/chat/${response.data._id}`
        );
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(error)
        );
      },
    });
  };