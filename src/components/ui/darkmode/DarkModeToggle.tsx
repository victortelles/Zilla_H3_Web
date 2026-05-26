"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Verificar localStorage o la preferencia del sistema
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const activeTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark) ? "dark" : "light";
    
    setTheme(activeTheme);
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex items-center justify-center p-2.5 rounded-lg border border-border bg-card text-foreground/50 hover:text-foreground transition-all duration-300 w-10 h-10"
      >
        <div className="w-5 h-5 animate-pulse rounded-full bg-muted" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="group relative flex items-center justify-center p-2.5 rounded-lg border border-border bg-card text-foreground/85 hover:text-foreground hover:bg-muted/50 hover:border-primary/50 shadow-sm transition-all duration-300 w-10 h-10 cursor-pointer overflow-hidden active:scale-95"
    >
      <span className="sr-only">Toggle dark mode</span>
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-amber-500 transition-transform duration-500 rotate-0 scale-100 group-hover:rotate-45" />
      ) : (
        <FiMoon className="w-5 h-5 text-primary transition-transform duration-500 rotate-0 scale-100 group-hover:-rotate-12" />
      )}
    </button>
  );
}
