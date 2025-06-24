"use client";

import { useState } from "react";
import { TitleBlock } from "@/components/common/title-block";
import { SolutionCard, SolutionContent } from "./cards/solution-card";

interface SolutionOfferingSectionProps {
  title: string;
  heading: string;
  solutions: SolutionContent[];
}

export function SolutionOffering(props: SolutionOfferingSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<any>(null);

  return (
    <section className="bg-secondary py-[80px] md:py-[108px]">
      <div className="container grid grid-cols-1 gap-y-12">
        <TitleBlock
          align="left"
          size="lg"
          classNames={{
            title: "text-foreground/40",
          }}
          {...props}
        />

        <div className="space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row">
            {props.solutions.slice(0, 2).map((solution, index) => (
              <SolutionCard
                key={`${solution.title}-${index}`}
                content={solution}
                isHovered={hoveredCard === `${solution.title}-${index}`}
                onMouseEnter={() =>
                  setHoveredCard(`${solution.title}-${index}`)
                }
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            {props.solutions.slice(2, 4).map((solution, index) => (
              <SolutionCard
                key={`${solution.title}-${index}`}
                content={solution}
                isHovered={hoveredCard === `${solution.title}-${index}`}
                onMouseEnter={() =>
                  setHoveredCard(`${solution.title}-${index}`)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
