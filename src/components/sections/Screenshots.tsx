import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { BASE_URL } from "@/lib/constants"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const screenshots = [
  {
    src: `${BASE_URL}screenshots/novo-fechamento-1.png`,
    title: "Novo fechamento",
    description: "Aqui inserimos um novo fechamento e geramos os jogos.",
  },
  {
    src: `${BASE_URL}screenshots/novo-fechamento-2.png`,
    title: "Simulação e jogos",
    description: "Simule resultados e veja o desempenho de cada jogo.",
  },
  {
    src: `${BASE_URL}screenshots/meus-fechamentos.png`,
    title: "Meus fechamentos",
    description: "Consulte seus fechamentos salvos e edite quando quiser.",
  },
  {
    src: `${BASE_URL}screenshots/entenda-o-fechamento.png`,
    title: "Entenda o fechamento",
    description: "Entenda o fechamento com cenários e exemplos visuais.",
  },
  {
    src: `${BASE_URL}screenshots/termos-de-uso.png`,
    title: "Termos de uso",
    description: "Documento completo com avisos e aceite obrigatório.",
  },
]

export function Screenshots() {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setActive(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])
  return (
    <section id="screenshots" className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="screenshots-reveal">
          <p className="text-sm font-medium text-primary">Screenshots</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Visual do sistema
          </h2>
          <p className="mt-4 text-muted-foreground">
            Navegue pelas principais telas e entenda o fluxo do Lotofácil 21.
          </p>
        </div>

        <div className="screenshots-reveal mt-10">
          <Carousel className="w-full shots-scale" setApi={setApi}>
            <CarouselContent>
              {screenshots.map((shot, index) => (
                <CarouselItem key={shot.src} className={cn("lg:basis-3/4 shots-item", active === index && "shots-item-active")}>
                  <Card className={cn("overflow-hidden transition-transform duration-300", active === index && "ring-2 ring-primary/50 shadow-lg scale-[1.01]")}>
                    <CardContent className="p-0">
                      <img src={shot.src} alt={shot.title} className="w-full" />
                      <div className="space-y-2 border-t bg-background p-4">
                        <Badge variant="secondary">{shot.title}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {shot.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="shots-thumbs mt-6 flex flex-wrap justify-center gap-3">
          {screenshots.map((shot, index) => (
            <button
              key={`thumb-${shot.src}`}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn("shots-thumb group overflow-hidden rounded-lg border bg-background transition-transform duration-200 active:scale-[0.98]", active === index && "ring-2 ring-primary/60")}
              aria-label={`Ver ${shot.title}`}
            >
              <img
                src={shot.src}
                alt={shot.title}
                className="h-16 w-24 object-cover transition-transform group-hover:scale-105"
              />
              <div
                className="h-0.5 w-full"
                style={{
                  background: active === index ? "var(--primary)" : "transparent",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
