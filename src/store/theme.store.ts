import { create } from "zustand";

export type Theme =
  | "light"
  | "dark";

interface ThemeState {
  theme: Theme;

  setTheme: (
    theme: Theme
  ) => void;

  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  const storedTheme =
    localStorage.getItem(
      "theme"
    );

  if (
    storedTheme === "light" ||
    storedTheme === "dark"
  ) {
    return storedTheme;
  }

  return "dark";
};

export const useThemeStore =
  create<ThemeState>((set) => ({
    theme: getInitialTheme(),

    setTheme: (theme) => {
      localStorage.setItem(
        "theme",
        theme
      );

      set({
        theme,
      });
    },

    toggleTheme: () =>
      set((state) => {
        const nextTheme =
          state.theme === "dark"
            ? "light"
            : "dark";

        localStorage.setItem(
          "theme",
          nextTheme
        );

        return {
          theme: nextTheme,
        };
      }),
  }));