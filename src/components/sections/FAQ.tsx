import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    question: "Funciona offline?",
    answer:
      "Sim. Após a ativação, o sistema funciona offline. Quando houver internet, ele realiza validações periódicas.",
  },
  {
    question: "Preciso de internet para usar?",
    answer:
      "Somente para ativar e validar a licença de tempos em tempos. O uso principal é offline.",
  },
  {
    question: "Funciona no Windows e no Linux?",
    answer:
      "Sim. Compatível com Windows 10/11 e Linux (Ubuntu/Debian e Fedora/RHEL).",
  },
  {
    question: "Como recebo o acesso após a compra?",
    answer:
      "Após a compra, você recebe o link de download e a licença de ativação pelo canal informado.",
  },
  {
    question: "Tem suporte?",
    answer:
      "Sim. O suporte é feito por e-mail do desenvolvedor.",
  },
  {
    question: "Posso usar em mais de um PC?",
    answer:
      "Depende da licença adquirida. Consulte os termos para detalhes.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-primary">FAQ</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Perguntas frequentes
        </h2>
      </div>
      <Accordion type="single" collapsible className="mt-8">
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
