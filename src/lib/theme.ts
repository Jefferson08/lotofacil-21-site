const STORAGE_KEY = "lotofacil21.theme"

type Theme = "dark" | "light"

export function getStoredTheme(): Theme | null {
  const value = localStorage.getItem(STORAGE_KEY)
  if (value === "dark" || value === "light") {
    return value
  }
  return null
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function initTheme() {
  const stored = getStoredTheme()
  const theme: Theme = stored ?? "dark"
  applyTheme(theme)
  return theme
}

export function toggleTheme(current: Theme) {
  const next: Theme = current === "dark" ? "light" : "dark"
  applyTheme(next)
  setStoredTheme(next)
  return next
}
