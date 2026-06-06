import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { AuthBootstrap } from "@/components/auth/AuthBootstrap";

export const AppProviders = ({
  children,
}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap>
        {children}
      </AuthBootstrap>
    </QueryClientProvider>
  );
};