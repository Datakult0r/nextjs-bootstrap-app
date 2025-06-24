import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SectionCProps = {
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
};

export function SectionC(props: SectionCProps) {
  return (
    <section>
      <div className="container border-x border-border py-24">
        <div className="mb-16 flex items-start justify-between">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none tracking-tighter">
            Frequently asked
            <br /> questions
          </h2>
          <div className="text-sm font-mono">
            <span className="font-medium">FAQ</span>
            <span className="ml-4 rounded-full border border-border p-4 opacity-50">
              07
            </span>
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-6">
          {props.faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="py-6 text-xl hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xl text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
