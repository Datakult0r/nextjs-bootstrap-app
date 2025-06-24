import type React from "react";
import { LucideProps } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { TitleBlock } from "@/components/common/title-block";
import { BookingForm } from "@/components/common/booking-form";

interface FeatureProps {
  icon: React.FC<LucideProps>;
  label: string;
  description: string;
}

interface SectionAProps {
  title: string;
  heading: string;
  features: FeatureProps[];
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function SectionA(props: SectionAProps) {
  return (
    <section className="border-y border-border">
      <div className="container border-x border-border py-16">
        <div className="relative">
          {/* Background Pattern - Simplified version of the geometric shapes */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-blue-50 opacity-50" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-50 opacity-50" />
          </div>

          <div className="space-y-16 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:space-y-0">
            <div className="space-y-16 lg:max-w-xl lg:flex-1">
              <TitleBlock
                title={props.title}
                classNames={{
                  container: "space-y-6",
                  title:
                    "bg-cyan-50 dark:bg-cyan-950 border-primary border text-cyan-500 w-fit rounded-full px-4 py-1.5",
                }}
                heading={props.heading}
                align="left"
                size="xl"
              />

              <BookingForm
                iframeUrl={props.cta.formUrl}
                iframeId={props.cta.formId}
              >
                <AnimatedArrowButton>{props.cta.label}</AnimatedArrowButton>
              </BookingForm>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:flex-1 lg:gap-16">
              {props.features.map((feature) => {
                return <Feature key={feature.label} {...feature} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature(props: FeatureProps) {
  return (
    <div className="space-y-4">
      <Button
        size="icon"
        variant="outline"
        className="border-primary text-primary hover:bg-transparent hover:text-primary"
      >
        <props.icon strokeWidth={1.7} />
      </Button>
      <div className="space-y-2">
        <h1 className="w-fit rounded-full py-1.5 font-mono uppercase">
          {props.label}
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          {props.description}
        </p>
      </div>
    </div>
  );
}
