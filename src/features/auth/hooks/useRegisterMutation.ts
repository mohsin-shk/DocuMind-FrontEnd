import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { register } from "@/api/auth.api";

import { getErrorMessage } from "@/lib/error-message";

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,

    onSuccess: (response) => {
      toast.success(
        response.message ||
          "Registration successful"
      );

      navigate("/login", {
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