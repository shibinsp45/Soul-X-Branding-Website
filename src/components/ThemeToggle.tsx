import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleTheme}
          className={cn(
            "group flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
            "border border-border hover:border-foreground/30",
            "bg-secondary/50 hover:bg-secondary",
            "text-sm font-medium"
          )}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            {isDark ? "🌙" : "🌞"}
          </span>
          <span className="text-foreground whitespace-nowrap text-xs hidden sm:inline">
            {isDark ? "Vitamin D OFF" : "Vitamin D ON"}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-foreground text-background">
        <p>Switch mood</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
