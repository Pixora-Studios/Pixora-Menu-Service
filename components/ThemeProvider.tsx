"use client";

import { useEffect } from "react";
import { CAFE_CONFIG } from "@/config/cafe.config";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const { theme } = CAFE_CONFIG;

    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--bg-secondary", theme.bgSecondary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-muted", theme.accentMuted);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--text-muted", theme.textMuted);
    root.style.setProperty("--card-bg", theme.cardBg);
    root.style.setProperty("--border", theme.border);

    // Set background color of body to prevent flash
    document.body.style.backgroundColor = theme.bg;
  }, []);

  return <>{children}</>;
}
