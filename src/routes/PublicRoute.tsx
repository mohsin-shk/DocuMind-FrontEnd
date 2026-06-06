import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";

export default function PublicRoute() {
  const isAuthenticated =
    useAuthStore(
      (state) => state.isAuthenticated
    );

  const isAuthInitialized = useAuthStore(
    (state) => state.isAuthInitialized
  );

  if (!isAuthInitialized) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}