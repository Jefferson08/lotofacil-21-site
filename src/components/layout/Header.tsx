import { useEffect, useState } from "react"
import { BadgeDollarSign, HelpCircle, Image, Layers3, LayoutGrid, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { HOTMART_URL } from "@/lib/constants"
import { ThemeToggle } from "@/components/ThemeToggle"


  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    event.preventDefault()
    const id = href.replace("#", "")
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("landing:navigate", { detail: { id } }))
      }, 200)
    }
  }

const navItems = [
  { href: "#recursos", label: "Recursos", icon: LayoutGrid },
  { href: "#screenshots", label: "Screenshots", icon: Image },
  { href: "#como-funciona", label: "Como funciona", icon: Layers3 },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
  { href: "#preco", label: "Preço", icon: BadgeDollarSign },
]

export function Header() {
  const [activeSection, setActiveSection] = useState("#recursos")

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    event.preventDefault()
    const id = href.replace("#", "")
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("landing:navigate", { detail: { id } }))
      }, 200)
    }
  }

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean)

    const updateFromHash = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash)
      }
    }

    const updateFromScroll = () => {
      const scrollPosition = window.scrollY + 120
      let current = navItems[0]?.href ?? "#recursos"
      sections.forEach((section, index) => {
        const el = section
        if (!(el instanceof HTMLElement)) return
        if (el.offsetTop <= scrollPosition) {
          current = navItems[index].href
        }
      })
      setActiveSection(current)
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateFromScroll()
        ticking = false
      })
    }

    updateFromHash()
    updateFromScroll()
    window.addEventListener("hashchange", updateFromHash)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("hashchange", updateFromHash)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <img src="/icon.png" alt="Lotofácil 21" className="h-8 w-8 rounded-lg" />
          <span className="text-sm font-semibold sm:text-base">Lotofácil 21</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors ${activeSection === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-current={activeSection === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild>
            <a href={HOTMART_URL} target="_blank" rel="noreferrer">
              Comprar agora
            </a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="flex flex-row items-center justify-between px-3 py-3">
                <SheetTitle className="flex items-center gap-2">
                  <img
                    src="/icon.png"
                    alt="Lotofácil 21"
                    className="h-8 w-8 rounded-lg"
                  />
                  <ThemeToggle />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-3 flex flex-col gap-1 px-3 pb-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${activeSection === item.href ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                    aria-current={activeSection === item.href ? "page" : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                ))}
                <Button asChild className="mt-4 w-full">
                  <a href={HOTMART_URL} target="_blank" rel="noreferrer">
                    Comprar agora
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
