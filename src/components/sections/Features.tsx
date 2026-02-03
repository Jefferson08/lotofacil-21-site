import {
  ChartLine,
  CheckCircle2,
  LayoutGrid,
  Rocket,
  WifiOff,
  ClipboardCopy,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Offline e privado",
    description: "Seus fechamentos ficam no seu computador, sem depender de internet.",
    icon: WifiOff,
  },
  {
    title: "Simulação e conferência",
    description: "Teste resultados, veja pontuações por jogo e entenda os cenários.",
    icon: ChartLine,
  },
  {
    title: "Organização de combinações",
    description: "Agrupe dezenas, visualize grupos e mantenha seu histórico claro.",
    icon: LayoutGrid,
  },
  {
    title: "Interface simples e rápida",
    description: "Fluxo direto para gerar e revisar jogos em poucos cliques.",
    icon: Rocket,
  },
  {
    title: "Fechamento com 21 dezenas",
    description: "Estratégia que pode aumentar as chances em determinados cenários, sem garantia de premiação.",
    icon: CheckCircle2,
  },
  {
    title: "Copie a lista de jogos",
    description: "Exporte as dezenas geradas com um clique para colar onde quiser.",
    icon: ClipboardCopy,
  },
]

export function Features() {
  return (
    <section id="recursos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Recursos</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Tudo o que você precisa para fechar com clareza
        </h2>
        <p className="mt-4 text-muted-foreground">
          O Lotofácil 21 foi pensado para organizar, simular e acompanhar seus jogos
          com transparência e controle.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="h-full">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
