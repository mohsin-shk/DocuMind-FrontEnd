import type { PropsWithChildren } from "react";
import AppSidebar from "@/components/layout/AppSidebar";
import Topbar from "@/components/layout/Topbar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function AppShell({
  children,
}: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Topbar />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}