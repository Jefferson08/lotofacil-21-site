import { ArrowRight, ShieldCheck, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BASE_URL, HOTMART_URL } from "@/lib/constants"

export function Hero() {
  return (
    <section id="top" className="border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <div className="hero-reveal flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <WifiOff className="h-3.5 w-3.5" />
              100% offline
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacidade total
            </Badge>
          </div>
          <h1 className="hero-reveal mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Gerador e simulador de fechamentos da Lotofácil com 21 dezenas
          </h1>
          <p className="hero-reveal mt-4 text-base leading-relaxed text-muted-foreground">
            Crie fechamentos de 21 dezenas, organize combinações e simule resultados em
            poucos minutos. O Lotofácil 21 oferece uma experiência simples e rápida
            para quem quer analisar seus jogos com clareza e confiança e aumentar suas chances em
            determinados cenários.
          </p>
          <div className="hero-reveal mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={HOTMART_URL} target="_blank" rel="noreferrer">
                Comprar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#como-funciona">Entenda o fechamento</a>
            </Button>
          </div>
          <div className="hero-reveal mt-6 text-sm text-muted-foreground">
            Aviso: ferramenta de simulação e organização. Não garante premiação.
          </div>
        </div>
        <div className="hero-reveal hero-media relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-lg">
            <img
              src={`${BASE_URL}screenshots/novo-fechamento-1.png`}
              alt="Tela do Lotofácil 21"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
