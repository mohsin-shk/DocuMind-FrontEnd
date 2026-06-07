import {
  Moon,
  Sun,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
  useThemeStore,
} from "@/store/theme.store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuthStore } from "@/store/auth.store";
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation";

export default function Topbar() {
  const {
    theme,
    toggleTheme,
  } = useThemeStore();

  const logoutMutation =
    useLogoutMutation();

  const user =
    useAuthStore(
      (state) => state.user
    );

  const initials =
    user?.fullName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      {/* LEFT */}

      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <h2 className="text-sm font-medium">
          Workspace
        </h2>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
          >
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-full p-0"
            >
              <Avatar>
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">
                {user?.fullName}
              </p>

              <p className="text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                logoutMutation.mutate()
              }
              disabled={
                logoutMutation.isPending
              }
            >
              <LogOut className="mr-2 size-4" />

              {logoutMutation.isPending
                ? "Logging out..."
                : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}