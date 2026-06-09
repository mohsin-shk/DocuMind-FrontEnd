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

      <SidebarInset className="h-screen overflow-hidden" >
        <Topbar />

        <main className="flex flex-1 min-h-0 flex-col ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}