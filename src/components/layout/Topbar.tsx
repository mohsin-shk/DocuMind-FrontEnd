import { Moon, User } from "lucide-react";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      {/* ========================================
          LEFT
      ======================================== */}

      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div>
          <h2 className="text-sm font-medium">
            Workspace
          </h2>
        </div>
      </div>

      {/* ========================================
          RIGHT
      ======================================== */}

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
        >
          <Moon className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
        >
          <User className="size-4" />
        </Button>
      </div>
    </header>
  );
}