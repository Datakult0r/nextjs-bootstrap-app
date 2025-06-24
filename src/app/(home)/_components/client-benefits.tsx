import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";

import { CardVariantA, CardVariantAProps } from "./cards/benefit-card/card-variant-a";
import { CardVariantB, CardVariantBProps } from "./cards/benefit-card/card-variant-b";
import { CardVariantC, CardVariantCProps } from "./cards/benefit-card/card-variant-c";
import { CardVariantD, CardVariantDProps } from "./cards/benefit-card/card-variant-d";

interface ClientBenefitsProps {
  heading: string;
  paragraph: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
  cards: {
    card1: CardVariantBProps;
    card2: CardVariantDProps;
    card3: CardVariantAProps;
    card4: CardVariantCProps;
  };
}

export function ClientBenefits(props: ClientBenefitsProps) {
  return (
    <section className="pt-[108px] bg-background overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 gap-y-12 px-6">
        <div className="flex flex-col gap-x-[105px] gap-y-6 lg:flex-row">
          <h1 className="max-w-[360px] text-4xl leading-[48px] -tracking-[1.8px]">
            {props.heading}
          </h1>
          <div className="flex flex-col gap-y-6">
            <p className="max-w-[460px] leading-6 tracking-[-0.16px] text-foreground">
              {props.paragraph}
            </p>
            <BookingForm
              iframeUrl={props.cta.formUrl}
              iframeId={props.cta.formId}
            >
              <AnimatedArrowButton className="w-fit rounded-full">
                {props.cta.label}
              </AnimatedArrowButton>
            </BookingForm>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-lg md:border md:border-border md:p-3 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CardVariantB {...props.cards.card1} />
          </div>
          <div className="lg:col-span-4">
            <CardVariantD {...props.cards.card2} />
          </div>
          <div className="lg:col-span-4">
            <CardVariantA {...props.cards.card3} />
          </div>
          <div className="lg:col-span-8">
            <CardVariantC {...props.cards.card4} />
          </div>
        </div>
      </div>
    </section>
  );
}
