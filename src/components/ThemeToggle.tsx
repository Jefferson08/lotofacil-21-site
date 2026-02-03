import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStoredTheme, toggleTheme } from "@/lib/theme"

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => getStoredTheme() ?? "dark")

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-md"
      aria-label="Alternar tema"
      onClick={() => setTheme(toggleTheme(theme))}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
