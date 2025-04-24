
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("quetras_theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    
    // Apply additional CSS variables for better dark mode text visibility
    const updateCssVariables = () => {
      const root = document.documentElement;
      if (theme === "dark") {
        // Ensure text is clearly visible in dark mode
        root.style.setProperty("--text-primary", "255, 255, 255");
        root.style.setProperty("--text-secondary", "200, 200, 210");
        root.style.setProperty("--text-muted", "160, 160, 180");
      } else {
        // Restore light mode text colors
        root.style.setProperty("--text-primary", "0, 0, 0");
        root.style.setProperty("--text-secondary", "50, 50, 60");
        root.style.setProperty("--text-muted", "100, 100, 120");
      }
    };
    
    updateCssVariables();
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("quetras_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    
    // Update CSS variables when toggling theme
    const root = document.documentElement;
    if (newTheme === "dark") {
      // Ensure text is clearly visible in dark mode
      root.style.setProperty("--text-primary", "255, 255, 255");
      root.style.setProperty("--text-secondary", "200, 200, 210");
      root.style.setProperty("--text-muted", "160, 160, 180");
    } else {
      // Restore light mode text colors
      root.style.setProperty("--text-primary", "0, 0, 0");
      root.style.setProperty("--text-secondary", "50, 50, 60");
      root.style.setProperty("--text-muted", "100, 100, 120");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
