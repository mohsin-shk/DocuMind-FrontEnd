import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export default function ProtectedRoute() {
  const isAuthenticated =
    useAuthStore(
      (state) => state.isAuthenticated
    );

  const isAuthInitialized = useAuthStore(
    (state) => state.isAuthInitialized
  );

  if (!isAuthInitialized) {
    return null; // AuthBootstrap is already showing the loading UI
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/register"
        replace
      />
    );
  }

  return <Outlet />;
}