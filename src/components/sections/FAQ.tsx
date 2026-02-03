import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    question: "Por que são 21 jogos?",
    answer:
      "Porque existem 21 combinações possíveis ao excluir 2 grupos dentre 7 (C(7,2)=21). Assim, todos os conjuntos de 5 grupos são contemplados.",
  },
  {
    question: "O que significa excluir 2 grupos?",
    answer:
      "Cada jogo mantém 5 grupos (15 dezenas) e exclui 2 grupos. Isso permite variar quais dezenas entram em cada jogo.",
  },
  {
    question: "Se eu acertar 15 dentro das 21, sempre dá 15 pontos?",
    answer:
      "Não necessariamente. Depende da distribuição das dezenas sorteadas entre os grupos. Em determinados cenários, o melhor jogo ainda pode excluir dezenas sorteadas.",
  },
  {
    question: "Preciso acertar as 15 dezenas dentro das 21?",
    answer:
      "Não necessariamente. Em determinados cenários, acertos de 14 ou 13 dezenas podem resultar em premiação. Isso depende da distribuição das dezenas sorteadas entre os grupos e dos jogos gerados.",
  },
  {
    question: "Isso garante premiação?",
    answer:
      "Não. O fechamento é uma ferramenta de combinação e simulação. O resultado final depende do sorteio e não há garantia de premiação.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="faq-reveal text-center">
        <p className="text-sm font-medium text-primary">FAQ</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Perguntas frequentes
        </h2>
      </div>
      <Accordion type="single" collapsible className="faq-reveal mt-8">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
