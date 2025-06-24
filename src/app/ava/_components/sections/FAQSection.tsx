"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TitleBlock } from "@/components/common/title-block";

interface FAQSectionProps {
  title: string;
  heading: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSection(props: FAQSectionProps) {
  return (
    <section className="py-24">
      <div className="container space-y-16">
        <TitleBlock
          title={props.title}
          heading={props.heading}
          align="left"
          classNames={{
            container: "mx-auto"
          }}
        />

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {props.items.map((value, index) => (
              <AccordionItem
                key={`${value.question}-${index}`}
                value={`item-${index}`}
                className="border-b border-white/15 py-2"
              >
                <AccordionTrigger>
                  <span className="text-start text-sm font-semibold tracking-tight">
                    {value.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {value.answer}
                  </span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
