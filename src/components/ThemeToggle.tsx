
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const isDark = localStorage.getItem("notes-theme") === "dark" || 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("notes-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("notes-theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
      {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
