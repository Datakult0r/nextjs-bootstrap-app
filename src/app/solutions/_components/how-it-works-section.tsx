import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { TitleBlock } from "@/components/common/title-block";

interface HowItWorksSectionProps {
  title: string;
  heading: string;
  paragraph: string;
  process: {
    number: string;
    heading: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
  }[];
}

export function HowItWorksSection(props: HowItWorksSectionProps) {
  const processes = props.process.map((process) => ({
    title: process.number,
    content: (
      <div>
        <p className="mb-8 text-sm text-foreground">{process.description}</p>
        <div className="aspect-image relative h-[500px]">
          <Image
            fill
            src={process.image.src}
            alt={process.image.alt}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    ),
  }));
  return (
    <section className="border-t border-border">
      <div className="container w-full border-x border-border py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <TitleBlock
            title={props.title}
            heading={props.heading}
            className="mb-4 max-w-4xl"
            size="lg"
          />
          <p className="max-w-sm text-sm text-muted-foreground md:text-base">
            {props.paragraph}
          </p>
        </div>

        <Timeline data={processes} />
      </div>
    </section>
  );
}
