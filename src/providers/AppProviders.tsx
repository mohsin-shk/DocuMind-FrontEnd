import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { AuthBootstrap } from "@/components/auth/AuthBootstrap";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/AppRouter";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";

export const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthBootstrap>
          <RouterProvider router={router} />
        </AuthBootstrap>
        <Toaster
          richColors
          position="top-right"
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
};