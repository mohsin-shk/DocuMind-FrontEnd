import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { getErrorMessage } from "@/lib/error-message";

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth
    );

  return useMutation({
    mutationFn: logout,

    onSuccess: (response) => {
      clearAuth();

      toast.success(
        response.message ||
          "Logged out successfully"
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