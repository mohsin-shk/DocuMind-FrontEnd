import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { getErrorMessage } from "@/lib/error-message";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  const setAccessToken =
    useAuthStore(
      (state) => state.setAccessToken
    );

  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  return useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      const {
        accessToken,
        user,
      } = response.data;

      setAccessToken(accessToken);
      setUser(user);

      toast.success(
        response.message ||
          "Login successful"
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