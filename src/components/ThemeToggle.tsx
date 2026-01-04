import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "button";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = "icon" }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "group relative flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-500",
          "border border-border hover:border-foreground/50",
          "bg-secondary hover:bg-secondary/80",
          "text-sm font-medium"
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="relative w-5 h-5">
          <Sun 
            className={cn(
              "h-5 w-5 text-foreground transition-all duration-500 absolute inset-0",
              isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
            )} 
          />
          <Moon 
            className={cn(
              "h-5 w-5 text-foreground transition-all duration-500 absolute inset-0",
              isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
            )} 
          />
        </div>
        <span className="text-foreground whitespace-nowrap">
          {isDark ? "Turn on Vitamin D ☀️" : "Get into Dark Mode 🌙"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-all duration-300",
        "hover:bg-foreground/10",
        "focus:outline-none focus:ring-2 focus:ring-foreground/20"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun 
        className={cn(
          "h-5 w-5 text-foreground transition-all duration-300 absolute",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )} 
      />
      <Moon 
        className={cn(
          "h-5 w-5 text-foreground transition-all duration-300",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )} 
      />
    </button>
  );
};

export default ThemeToggle;
