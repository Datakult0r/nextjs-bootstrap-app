import { CircleDot } from "lucide-react";

import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";

interface SectionBProps {
  title: string;
  paragraph: string;
  options: {
    label: string;
    isNew: boolean;
    title: string;
    points: string[];
  }[];
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function SectionB(props: SectionBProps) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container flex flex-col gap-24 py-24">
        <div className="space-y-4">
          <h1 className="text-4xl tracking-tighter md:text-5xl">
            {props.title}
          </h1>
          <p className="text-lg text-navy-foreground/50">{props.paragraph}</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {props.options.map((option, index) => (
            <div key={index} className="space-y-16">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-primary px-4 py-1 font-mono text-sm font-medium uppercase text-primary">
                    {option.label}
                  </span>
                </div>
                <h2 className="text-3xl tracking-tight">{option.title}</h2>
              </div>

              <div className="space-y-7">
                {option.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex gap-3">
                    <CircleDot
                      strokeWidth={1.5}
                      className="mt-1 size-7 flex-shrink-0 text-navy-foreground/50"
                    />
                    <p className="text-navy-foreground/50">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <BookingForm
            iframeUrl={props.cta.formUrl}
            iframeId={props.cta.formId}
          >
            <AnimatedArrowButton size="lg">
              {props.cta.label}
            </AnimatedArrowButton>
          </BookingForm>
        </div>
      </div>
    </section>
  );
}
