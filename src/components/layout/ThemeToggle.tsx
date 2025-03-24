
import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full transition-all hover:bg-accent"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
