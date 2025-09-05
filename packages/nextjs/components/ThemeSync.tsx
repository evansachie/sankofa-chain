"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSync = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDarkMode = resolvedTheme === "dark";

    // Sync the dark class for ethereum-identity-kit
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return null;
};

export default ThemeSync;
