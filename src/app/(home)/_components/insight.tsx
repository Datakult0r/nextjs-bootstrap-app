"use client";

import { InsightCard, InsightCardProps } from "./cards/insight-card";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TitleBlock } from "@/components/common/title-block";

interface InsightSectionProps {
  title: string;
  heading: string;
  bloglink: string;
  articles: InsightCardProps[];
}

export function Insight(props: InsightSectionProps) {
  return (
    <section>
      <div className="container space-y-12 py-20 border-x border-border">
        <div className="flex flex-col items-start gap-y-8 md:flex-row md:items-center md:justify-between">
          <TitleBlock
            {...props}
            size="md"
            className="max-w-[540px] pb-0"
            align="left"
          />

          <a href={props.bloglink} target="_blank" rel="noopener noreferrer">
            <AnimatedArrowButton size="sm" className="text-xs md:mr-10">
              View All
            </AnimatedArrowButton>
          </a>
        </div>
        <Carousel
          className="mx-auto w-full max-w-[1150px]"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="-ml-1">
            {props.articles.map((insight, index) => (
              <CarouselItem
                key={insight.heading + index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <InsightCard key={insight.heading + index} {...insight} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
