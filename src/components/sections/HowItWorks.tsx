import { AlertTriangle, Info, Layers, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const selectedNumbers = Array.from({ length: 21 }, (_, index) => index + 1)
const selectionOrder = [
  3, 14, 7, 15, 1, 19, 5, 12, 9, 16, 2, 18, 4, 11, 20, 6, 13, 21, 8, 10,
  17,
]

const scenarioAResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const scenarioBResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16]
const scenarioCResult = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 16, 17, 19]
const orderImpactResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function chunkGroups(numbers: number[]) {
  const groups: number[][] = []
  for (let i = 0; i < numbers.length; i += 3) {
    groups.push(numbers.slice(i, i + 3))
  }
  return groups
}


function generateGames(groups: number[][]) {
  const games: number[][] = []
  for (let i = 0; i < groups.length; i += 1) {
    for (let j = i + 1; j < groups.length; j += 1) {
      const game = groups
        .filter((_, index) => index != i && index != j)
        .flat()
        .sort((a, b) => a - b)
      games.push(game)
    }
  }
  return games
}

function scoreGame(game: number[], resultSet: Set<number>) {
  return game.reduce((total, dezena) => total + (resultSet.has(dezena) ? 1 : 0), 0)
}

function summarizeScores(scores: number[]) {
  const summary: Record<number, number> = {}
  for (let pontos = 11; pontos <= 15; pontos += 1) {
    summary[pontos] = 0
  }
  scores.forEach((score) => {
    if (summary[score] !== undefined) {
      summary[score] += 1
    }
  })
  return summary
}

const baseGroups = chunkGroups(selectedNumbers)
const selectionGroups = chunkGroups(selectionOrder)

function formatDezena(value: number) {
  return value.toString().padStart(2, "0")
}

function buildScenario(result: number[], groups: number[][]) {
  const resultSet = new Set(result)
  const totalHits = selectedNumbers.filter((value) => resultSet.has(value)).length
  const hitsByGroup = groups.map(
    (group) => group.filter((value) => resultSet.has(value)).length
  )
  const games = generateGames(groups)
  const scores = games.map((game) => scoreGame(game, resultSet))
  const summary = summarizeScores(scores)

  return {
    result,
    resultSet,
    totalHits,
    hitsByGroup,
    groups,
    summary,
  }
}

const scenarioA = buildScenario(scenarioAResult, baseGroups)
const scenarioB = buildScenario(scenarioBResult, baseGroups)
const scenarioC = buildScenario(scenarioCResult, baseGroups)
const orderImpactSelection = buildScenario(orderImpactResult, selectionGroups)
const orderImpactSorted = buildScenario(orderImpactResult, baseGroups)

const scenarios = {
  a: {
    title: "Resultado concentrado em 5 grupos",
    highlight: "Este é o cenário ideal, com a premiação de 15 pontos.",
    description:
      "Existem dois grupos vazios, então há um jogo que exclui esses grupos e mantém todas as dezenas sorteadas.",
    data: scenarioA,
  },
  b: {
    title: "Resultado distribuído em 6 grupos",
    highlight: "Neste exemplo, o melhor jogo alcança 14 pontos.",
    description:
      "Sempre será necessário excluir um grupo com dezenas sorteadas, e o melhor jogo depende da distribuição.",
    data: scenarioB,
  },
  c: {
    title: "Resultado distribuído em 7 grupos",
    highlight: "",
    description:
      "Todos os grupos têm dezenas sorteadas, então dois grupos com dezenas serão excluídos.",
    data: scenarioC,
  },
}

function BadgesRow({ numbers }: { numbers: number[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {numbers.map((value) => (
        <Badge key={value} variant="secondary">
          {formatDezena(value)}
        </Badge>
      ))}
    </div>
  )
}

function GroupsPanel({ groups, resultSet }: { groups: number[][]; resultSet: Set<number> }) {
  return (
    <div className="space-y-2">
      {groups.map((group, index) => (
        <div key={`group-${index}`} className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Grupo {index + 1}
          </span>
          {group.map((value) => (
            <Badge
              key={`${index}-${value}`}
              variant={resultSet.has(value) ? "default" : "secondary"}
            >
              {formatDezena(value)}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  )
}

function ScenarioPanel({
  title,
  highlight,
  description,
  data,
}: {
  title: string
  highlight: string
  description: string
  data: ReturnType<typeof buildScenario>
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm font-medium text-foreground">{highlight}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Dezenas selecionadas (21)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BadgesRow numbers={selectedNumbers} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Grupos (7x3)</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupsPanel groups={data.groups} resultSet={data.resultSet} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Resultado sorteado (15)</CardTitle>
              <CardDescription>
                Depende da distribuição das dezenas entre os grupos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <BadgesRow numbers={data.result} />
              <div className="text-sm font-semibold text-foreground">
                {data.totalHits} acertos entre as 21
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Distribuição do resultado nos grupos</div>
                <div className="grid gap-2">
                  {data.hitsByGroup.map((hits, index) => (
                    <div
                      key={`dist-${index}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">Grupo {index + 1}</span>
                      <Badge variant={hits === 0 ? "secondary" : "default"}>
                        {hits} acertos
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Detalhamento (bilhetes premiados)
          </CardTitle>
          <CardDescription>
            Quantidade de jogos por faixa de acertos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {Object.entries(data.summary).map(([points, count]) => (
            <Badge key={points} variant={count > 0 ? "default" : "secondary"}>
              {points} pontos: {count}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  )
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
                {baseGroups.slice(0, 5).flat().map((value) => (
                  <Badge key={value} variant="secondary">
                    {formatDezena(value)}
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

            <TabsContent value="cenario-a" className="mt-6">
              <ScenarioPanel
                title={scenarios.a.title}
                highlight={scenarios.a.highlight}
                description={scenarios.a.description}
                data={scenarios.a.data}
              />
            </TabsContent>
            <TabsContent value="cenario-b" className="mt-6">
              <ScenarioPanel
                title={scenarios.b.title}
                highlight={scenarios.b.highlight}
                description={scenarios.b.description}
                data={scenarios.b.data}
              />
            </TabsContent>
            <TabsContent value="cenario-c" className="mt-6">
              <ScenarioPanel
                title={scenarios.c.title}
                highlight={scenarios.c.highlight}
                description={scenarios.c.description}
                data={scenarios.c.data}
              />
            </TabsContent>
            <TabsContent value="impacto" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impacto da ordem</CardTitle>
                    <CardDescription>
                      A ordem não muda as dezenas, mas altera a distribuição nos grupos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Manter a ordem de seleção ajuda a distribuir dezenas estratégicas. Ordenar as
                    dezenas é mais rápido, mas com menos controle sobre os grupos.
                  </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">
                        Manter ordem de seleção
                      </CardTitle>
                      <CardDescription>
                        Grupos seguem a ordem em que você escolhe as dezenas.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <BadgesRow numbers={selectionOrder} />
                      <GroupsPanel groups={selectionGroups} resultSet={orderImpactSelection.resultSet} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">
                        Ordenar dezenas
                      </CardTitle>
                      <CardDescription>
                        As dezenas são ordenadas antes da formação dos grupos.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <BadgesRow numbers={selectedNumbers} />
                      <GroupsPanel groups={baseGroups} resultSet={orderImpactSorted.resultSet} />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      Resultado e distribuição
                    </CardTitle>
                    <CardDescription>
                      Mesmo resultado aplicado aos dois modos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Ordem de seleção</div>
                      <BadgesRow numbers={orderImpactResult} />
                      <div className="text-sm font-semibold text-foreground">
                        {orderImpactSelection.totalHits} acertos entre as 21
                      </div>
                      <div className="grid gap-2">
                        {orderImpactSelection.hitsByGroup.map((hits, index) => (
                          <div
                            key={`impacto-ordem-${index}`}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">Grupo {index + 1}</span>
                            <Badge variant={hits === 0 ? "secondary" : "default"}>
                              {hits} acertos
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Dezenas ordenadas</div>
                      <BadgesRow numbers={orderImpactResult} />
                      <div className="text-sm font-semibold text-foreground">
                        {orderImpactSorted.totalHits} acertos entre as 21
                      </div>
                      <div className="grid gap-2">
                        {orderImpactSorted.hitsByGroup.map((hits, index) => (
                          <div
                            key={`impacto-ordenado-${index}`}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">Grupo {index + 1}</span>
                            <Badge variant={hits === 0 ? "secondary" : "default"}>
                              {hits} acertos
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </section>
  )
}
