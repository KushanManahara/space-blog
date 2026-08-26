"use client";

import * as React from "react";

export type ReaderTheme = "system" | "sepia" | "slate" | "oled";
export type ReaderFontSize = "sm" | "md" | "lg" | "xl";
export type ReaderFontFamily = "sans" | "serif" | "mono";
export type ReaderColumnWidth = "narrow" | "standard" | "wide";

interface ReaderModeContextValue {
  isReaderMode: boolean;
  setIsReaderMode: (open: boolean) => void;
  toggleReaderMode: () => void;
  theme: ReaderTheme;
  setTheme: (theme: ReaderTheme) => void;
  fontSize: ReaderFontSize;
  setFontSize: (size: ReaderFontSize) => void;
  fontFamily: ReaderFontFamily;
  setFontFamily: (family: ReaderFontFamily) => void;
  columnWidth: ReaderColumnWidth;
  setColumnWidth: (width: ReaderColumnWidth) => void;
}

const ReaderModeContext = React.createContext<ReaderModeContextValue | null>(null);

const STORAGE_KEYS = {
  theme: "space_reader_theme",
  fontSize: "space_reader_font_size",
  fontFamily: "space_reader_font_family",
  columnWidth: "space_reader_column_width",
} as const;

export function ReaderModeProvider({ children }: { children: React.ReactNode }) {
  const [isReaderMode, setIsReaderMode] = React.useState(false);
  const [theme, setThemeState] = React.useState<ReaderTheme>("system");
  const [fontSize, setFontSizeState] = React.useState<ReaderFontSize>("md");
  const [fontFamily, setFontFamilyState] = React.useState<ReaderFontFamily>("sans");
  const [columnWidth, setColumnWidthState] = React.useState<ReaderColumnWidth>("standard");

  // Load preferences from localStorage once mounted
  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) as ReaderTheme | null;
      if (savedTheme) {
        queueMicrotask(() => setThemeState(savedTheme));
      }

      const savedFontSize = localStorage.getItem(STORAGE_KEYS.fontSize) as ReaderFontSize | null;
      if (savedFontSize) {
        queueMicrotask(() => setFontSizeState(savedFontSize));
      }

      const savedFontFamily = localStorage.getItem(
        STORAGE_KEYS.fontFamily,
      ) as ReaderFontFamily | null;
      if (savedFontFamily) {
        queueMicrotask(() => setFontFamilyState(savedFontFamily));
      }

      const savedWidth = localStorage.getItem(STORAGE_KEYS.columnWidth) as ReaderColumnWidth | null;
      if (savedWidth) {
        queueMicrotask(() => setColumnWidthState(savedWidth));
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const setTheme = React.useCallback((newTheme: ReaderTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, newTheme);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const setFontSize = React.useCallback((newSize: ReaderFontSize) => {
    setFontSizeState(newSize);
    try {
      localStorage.setItem(STORAGE_KEYS.fontSize, newSize);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const setFontFamily = React.useCallback((newFamily: ReaderFontFamily) => {
    setFontFamilyState(newFamily);
    try {
      localStorage.setItem(STORAGE_KEYS.fontFamily, newFamily);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const setColumnWidth = React.useCallback((newWidth: ReaderColumnWidth) => {
    setColumnWidthState(newWidth);
    try {
      localStorage.setItem(STORAGE_KEYS.columnWidth, newWidth);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const toggleReaderMode = React.useCallback(() => {
    setIsReaderMode((prev) => !prev);
  }, []);

  // Keyboard shortcut: Press 'R' to toggle, 'Esc' to exit
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Don't intercept when user is typing in inputs or textareas
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if (e.key === "r" || e.key === "R") {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          toggleReaderMode();
        }
      } else if (e.key === "Escape" && isReaderMode) {
        e.preventDefault();
        setIsReaderMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReaderMode, toggleReaderMode]);

  // Lock body scroll when in reader mode
  React.useEffect(() => {
    if (isReaderMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isReaderMode]);

  const value = React.useMemo(
    () => ({
      isReaderMode,
      setIsReaderMode,
      toggleReaderMode,
      theme,
      setTheme,
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      columnWidth,
      setColumnWidth,
    }),
    [
      isReaderMode,
      toggleReaderMode,
      theme,
      setTheme,
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      columnWidth,
      setColumnWidth,
    ],
  );

  return <ReaderModeContext.Provider value={value}>{children}</ReaderModeContext.Provider>;
}

export function useReaderMode() {
  const context = React.useContext(ReaderModeContext);
  if (!context) {
    throw new Error("useReaderMode must be used within a ReaderModeProvider");
  }
  return context;
}
