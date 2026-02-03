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

const navItems = [
  { href: "#recursos", label: "Recursos", icon: LayoutGrid },
  { href: "#screenshots", label: "Screenshots", icon: Image },
  { href: "#como-funciona", label: "Como funciona", icon: Layers3 },
  { href: "#faq", label: "FAQ", icon: HelpCircle },
  { href: "#preco", label: "Preço", icon: BadgeDollarSign },
]

export function Header() {
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
              className="text-muted-foreground transition-colors hover:text-foreground"
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
            <SheetContent side="right" className="w-72 p-4">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTitle>
                  <img
                    src="/icon.png"
                    alt="Lotofácil 21"
                    className="h-8 w-8 rounded-lg"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="absolute right-12 top-4">
                <ThemeToggle />
              </div>
              <div className="mt-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
