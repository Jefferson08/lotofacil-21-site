import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HOTMART_URL, PRICE } from "@/lib/constants"

const items = [
  "Download imediato do instalador após a compra",
  "Chave de licença enviada por e-mail",
  "Geração de fechamentos com 21 dezenas",
  "Simulação e detalhamento por jogo",
  "Uso offline após ativação",
]

export function Pricing() {
  return (
    <section id="preco" className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">Preço</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Licença do sistema
          </h2>
          <p className="mt-4 text-muted-foreground">
            Compra segura pela Hotmart. Sem promessas de premiação.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lotofácil 21</CardTitle>
                <Badge variant="secondary">Hotmart</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold tracking-tight">{PRICE}</div>
      <div className="mt-2 text-sm text-muted-foreground">Em até 3x no cartão pela Hotmart.</div>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <a href={HOTMART_URL} target="_blank" rel="noreferrer">
                  Comprar agora
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
