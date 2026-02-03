import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor } from "lucide-react"

const screenshots = [
  {
    src: "/screenshots/novo-fechamento-1.png",
    title: "Novo fechamento",
  },
  {
    src: "/screenshots/novo-fechamento-2.png",
    title: "Simulação e jogos",
  },
  {
    src: "/screenshots/meus-fechamentos.png",
    title: "Meus fechamentos",
  },
  {
    src: "/screenshots/entenda-o-fechamento.png",
    title: "Entenda o fechamento",
  },
  {
    src: "/screenshots/termos-de-uso.png",
    title: "Termos de uso",
  },
]

export function Screenshots() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="screenshots" className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Screenshots</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Veja o sistema em ação
            </h2>
            <p className="mt-4 text-muted-foreground">
              Interface clara, rápida e feita para o fluxo de fechamentos.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Monitor className="h-3.5 w-3.5" />
            Aplicativo desktop
          </div>
        </div>

        <div className="mt-10 hidden grid-cols-2 gap-4 lg:grid">
          {screenshots.map((shot) => (
            <Dialog key={shot.src} open={active === shot.src} onOpenChange={(open) => setActive(open ? shot.src : null)}>
              <DialogTrigger asChild>
                <Card className="group cursor-zoom-in overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={shot.src}
                      alt={shot.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-5xl border-none bg-transparent shadow-none">
                <div className="overflow-hidden rounded-2xl border bg-card">
                  <img src={shot.src} alt={shot.title} className="w-full" />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 lg:hidden">
          {screenshots.map((shot) => (
            <div
              key={shot.src}
              className="min-w-[80%] snap-start rounded-2xl border bg-card shadow-sm"
            >
              <img src={shot.src} alt={shot.title} className="w-full rounded-2xl" />
              <div className="p-3">
                <Badge variant="secondary">{shot.title}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
