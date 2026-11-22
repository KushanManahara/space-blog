"use client";

import { useEffect } from "react";

import { syncThemeChrome } from "@/lib/theme-chrome";

/**
 * Keeps browser system chrome (`<meta name="theme-color">` and
 * `<meta name="color-scheme">`) synchronised with the active Light / Dark theme
 * across client navigations, class mutations, and cross-tab `localStorage`
 * updates.
 */
export function ThemeChromeSync() {
  useEffect(() => {
    const syncFromDom = () => {
      const isDark = document.documentElement.classList.contains("dark");
      syncThemeChrome(isDark ? "dark" : "light");
    };

    syncFromDom();

    const observer = new MutationObserver(syncFromDom);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      const isDark = event.newValue === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.classList.toggle("light", !isDark);
      syncThemeChrome(isDark ? "dark" : "light");
    };

    window.addEventListener("storage", onStorage);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
