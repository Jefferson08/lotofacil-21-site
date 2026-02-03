import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const steps = [
  {
    title: "Escolha 21 dezenas",
    description:
      "Selecione as dezenas que deseja usar no fechamento e defina o modo de ordenação.",
  },
  {
    title: "Forme 7 grupos",
    description:
      "As dezenas são organizadas em 7 grupos de 3 (7x3), respeitando a ordem ou ordenação escolhida.",
  },
  {
    title: "Gere 21 jogos",
    description:
      "Cada jogo exclui 2 grupos e mantém 5 grupos, totalizando 15 dezenas por jogo.",
  },
  {
    title: "Simule resultados",
    description:
      "Compare com resultados informados e veja a distribuição de acertos por jogo.",
  },
]

const exampleGroups = [
  ["01", "02", "03"],
  ["04", "05", "06"],
  ["07", "08", "09"],
  ["10", "11", "12"],
  ["13", "14", "15"],
  ["16", "17", "18"],
  ["19", "20", "21"],
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Como funciona</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Fechamento de 21 dezenas em poucos passos
        </h2>
        <p className="mt-4 text-muted-foreground">
          O processo combina grupos de dezenas para gerar 21 jogos de 15 dezenas. Sem promessas,
          apenas uma estratégia de organização e simulação.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <CardHeader className="flex flex-row items-center gap-3">
                <Badge variant="secondary">Passo {index + 1}</Badge>
                <CardTitle className="text-base">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-base">Exemplo visual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Os 21 números são organizados em 7 grupos (3 dezenas cada). Em cada jogo, dois grupos
              são excluídos e cinco permanecem.
            </p>
            <Separator className="my-4" />
            <div className="space-y-2">
              {exampleGroups.map((group, index) => (
                <div key={`grupo-${index}`} className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Grupo {index + 1}
                  </span>
                  {group.map((num) => (
                    <Badge key={num} variant="secondary">
                      {num}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
              Ex.: se excluímos os grupos 6 e 7, o jogo mantém os grupos 1–5 (15 dezenas).
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
