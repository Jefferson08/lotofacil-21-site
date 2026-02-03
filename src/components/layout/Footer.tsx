import { Button } from "@/components/ui/button"
import { HOTMART_URL } from "@/lib/constants"

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#screenshots", label: "Screenshots" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
  { href: "#preco", label: "Preço" },
]

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold">Lotofácil 21</div>
            <p className="mt-2 text-xs text-muted-foreground">
              Este software não garante prêmios. Uso para simulação e organização de combinações.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>
          <Button asChild>
            <a href={HOTMART_URL} target="_blank" rel="noreferrer">
              Comprar agora
            </a>
          </Button>
        </div>
        <div className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jefferson Carvalho. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
