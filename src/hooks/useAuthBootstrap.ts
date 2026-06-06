import { useEffect } from "react";
import { getCurrentUser } from "@/api/auth.api";
import { requestNewAccessToken } from "@/api/auth-token";
import { useAuthStore } from "@/store/auth.store";

export const useAuthBootstrap = () => {
  const setAccessToken =
    useAuthStore(
      (state) => state.setAccessToken
    );

  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  const setAuthInitialized =
    useAuthStore(
      (state) => state.setAuthInitialized
    );

  useEffect(() => {
    const bootstrap = async () => {
      try {
        /*
        ========================================
        REFRESH ACCESS TOKEN
        ========================================
        */

        const refreshResponse =
          await requestNewAccessToken();

        const accessToken =
          refreshResponse.data.accessToken;

        setAccessToken(accessToken);

        /*
        ========================================
        FETCH CURRENT USER
        ========================================
        */

        const userResponse =
          await getCurrentUser();

        setUser(userResponse.data.user);
      } catch(error) {
        /*
        ========================================
        USER NOT AUTHENTICATED
        ========================================
        */

        useAuthStore
          .getState()
          .clearAuth();
      } finally {
        /*
        ========================================
        BOOTSTRAP COMPLETE
        ========================================
        */

        setAuthInitialized(true);
      }
    };

    void bootstrap();
  }, [
    setAccessToken,
    setUser,
    setAuthInitialized,
  ]);
};