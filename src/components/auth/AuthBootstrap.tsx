import type { PropsWithChildren } from "react";

import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import { useAuthStore } from "@/store/auth.store";

export const AuthBootstrap = ({
  children,
}: PropsWithChildren) => {
  useAuthBootstrap();

  const isAuthInitialized =
    useAuthStore(
      (state) => state.isAuthInitialized
    );

  if (!isAuthInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Initializing...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};