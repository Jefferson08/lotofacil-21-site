import { AlertTriangle, Info, Layers, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const groupsExample = [
  ["01", "02", "03"],
  ["04", "05", "06"],
  ["07", "08", "09"],
  ["10", "11", "12"],
  ["13", "14", "15"],
  ["16", "17", "18"],
  ["19", "20", "21"],
]

const scenarios = {
  a: {
    title: "Resultado concentrado em 5 grupos",
    highlight: "Cenário ideal: maior chance de 15 pontos.",
    description:
      "Quando dois grupos ficam vazios, existe um jogo que exclui exatamente esses grupos e mantém todas as dezenas sorteadas.",
  },
  b: {
    title: "Resultado distribuído em 6 grupos",
    highlight: "Neste cenário, o melhor jogo depende da distribuição.",
    description:
      "Sempre será necessário excluir um grupo com dezenas sorteadas. O desempenho varia conforme a quantidade de dezenas em cada grupo.",
  },
  c: {
    title: "Resultado distribuído em 7 grupos",
    highlight: "Todos os grupos têm dezenas sorteadas.",
    description:
      "Dois grupos com dezenas serão excluídos em cada jogo, então a pontuação máxima depende da concentração das dezenas sorteadas.",
  },
  impact: {
    title: "Impacto da ordem",
    highlight: "A ordem não muda as dezenas, só a distribuição nos grupos.",
    description:
      "Manter a ordem de seleção ajuda a distribuir dezenas estratégicas. Ordenar as dezenas é mais rápido, mas com menos controle sobre os grupos.",
  },
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Entenda o fechamento</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Como o fechamento de 21 dezenas gera 21 jogos
        </h2>
        <p className="mt-4 text-muted-foreground">
          Explicação clara, com cenários reais e sem promessas. O resultado depende do sorteio e da
          distribuição das dezenas nos grupos.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Como os 21 jogos são gerados</CardTitle>
            <CardDescription>Do agrupamento 7x3 até a combinação completa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <ol className="list-decimal space-y-2 pl-6">
              <li>As 21 dezenas escolhidas são organizadas em 7 grupos de 3.</li>
              <li>Cada jogo mantém 5 grupos (5 x 3 = 15 dezenas) e exclui 2 grupos.</li>
              <li>Excluir 2 grupos dentre 7 gera 21 combinações (C(7,2)=21).</li>
              <li>Assim, todas as combinações de 5 grupos ficam cobertas.</li>
            </ol>
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm font-medium text-foreground">Exemplo rápido</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Se excluímos os grupos 6 e 7, o jogo é formado pelos grupos 1–5 (15 dezenas).
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {groupsExample.slice(0, 5).flat().map((value) => (
                  <Badge key={value} variant="secondary">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Objetivo</CardTitle>
              <CardDescription>O que buscamos ao fechar 21 dezenas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              O ideal é que as 15 dezenas sorteadas estejam dentro das 21 escolhidas. O fechamento
              organiza essas dezenas em jogos com combinações diferentes de grupos.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Cobertura</CardTitle>
              <CardDescription>Distribuição entre grupos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              Cada jogo exclui dois grupos. Em determinados cenários, existe um jogo que exclui
              grupos vazios e mantém todos os grupos com dezenas sorteadas.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Sem garantia</CardTitle>
              <CardDescription>Resultados variam por sorteio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              O desempenho depende do sorteio e da distribuição das dezenas. Não há garantia de
              premiação ou pontuação fixa.
            </CardContent>
          </Card>
        </div>

        <Separator />

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold tracking-tight">Passo a passo</h3>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">Passo 1</CardTitle>
                </div>
                <Badge variant="secondary">modo</Badge>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Escolha 21 dezenas e defina o modo: manter ordem de seleção ou ordenar dezenas. Isso
                altera a composição dos grupos.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">Passo 2</CardTitle>
                </div>
                <Badge variant="secondary">7x3</Badge>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Os grupos (7x3) são montados conforme a seleção das dezenas. Ao completar 21, formam-se
                7 grupos completos.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">Passo 3</CardTitle>
                </div>
                <Badge variant="secondary">21 jogos</Badge>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                O sistema gera 21 jogos porque existem 21 pares de grupos para excluir. Cada jogo mantém
                5 grupos (15 dezenas).
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-destructive/40 bg-destructive/5">
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <CardTitle className="text-base">Aviso importante</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Não há garantia de premiação. O fechamento é uma estratégia de combinação; o resultado
              depende do sorteio e da distribuição das dezenas sorteadas entre os grupos.
            </CardContent>
          </Card>
          <Card className="border-yellow-500/40 bg-yellow-500/10">
            <CardHeader className="flex flex-row items-center gap-2">
              <Info className="h-4 w-4" />
              <CardTitle className="text-base">Sobre as apostas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              O sistema apenas gera os jogos. As apostas precisam ser realizadas pelo próprio
              apostador, via loterias online ou lotérica.
            </CardContent>
          </Card>
        </div>

        <Separator />

        <section className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">Exemplos com cenários</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Compare cenários reais e entenda como a distribuição entre grupos pode afetar a
              pontuação.
            </p>
          </div>

          <Tabs defaultValue="cenario-a" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cenario-a">Cenário A</TabsTrigger>
              <TabsTrigger value="cenario-b">Cenário B</TabsTrigger>
              <TabsTrigger value="cenario-c">Cenário C</TabsTrigger>
              <TabsTrigger value="impacto">Impacto da ordem</TabsTrigger>
            </TabsList>

            {Object.entries({
              "cenario-a": scenarios.a,
              "cenario-b": scenarios.b,
              "cenario-c": scenarios.c,
              impacto: scenarios.impact,
            }).map(([key, scenario]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{scenario.title}</CardTitle>
                    <CardDescription>{scenario.highlight}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-muted-foreground">
                    {scenario.description}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </section>
  )
}
