import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const screenshots = [
  {
    src: "/screenshots/novo-fechamento-1.png",
    title: "Novo fechamento",
    description: "Aqui inserimos um novo fechamento e geramos os jogos.",
  },
  {
    src: "/screenshots/novo-fechamento-2.png",
    title: "Simulação e jogos",
    description: "Simule resultados e veja o desempenho de cada jogo.",
  },
  {
    src: "/screenshots/meus-fechamentos.png",
    title: "Meus fechamentos",
    description: "Consulte seus fechamentos salvos e edite quando quiser.",
  },
  {
    src: "/screenshots/entenda-o-fechamento.png",
    title: "Entenda o fechamento",
    description: "Entenda o fechamento com cenários e exemplos visuais.",
  },
  {
    src: "/screenshots/termos-de-uso.png",
    title: "Termos de uso",
    description: "Documento completo com avisos e aceite obrigatório.",
  },
]

export function Screenshots() {
  return (
    <section id="screenshots" className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div>
          <p className="text-sm font-medium text-primary">Screenshots</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Visual do sistema
          </h2>
          <p className="mt-4 text-muted-foreground">
            Navegue pelas principais telas e entenda o fluxo do Lotofácil 21.
          </p>
        </div>

        <div className="mt-10">
          <Carousel className="w-full">
            <CarouselContent>
              {screenshots.map((shot) => (
                <CarouselItem key={shot.src} className="lg:basis-3/4">
                  <Card className="overflow-hidden">
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
      </div>
    </section>
  )
}
