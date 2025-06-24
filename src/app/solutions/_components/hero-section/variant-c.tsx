"use client";

import * as React from "react";
import { forwardRef, useRef } from "react";
import Image from "next/image";

import { cn } from "@/libs/utils";
import { TitleBlock } from "@/components/common/title-block";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { DottedBackground } from "@/components/ui/animated-dotted-background";

interface HeroSectionProps {
  title: string;
  heading: string;
  paragraph: string;
  cta: {
    label: string;
  };
  connections: {
    base: JSX.Element;
    nodes: (JSX.Element | string)[];
  };
}

export function HeroSection(props: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);

  const nodeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <DottedBackground>
      <section className="relative border-b border-border py-20">
        <div className="container max-w-4xl px-4 text-center">
          <TitleBlock title={props.title} heading={props.heading} size="xl" />
          <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground">
            {props.paragraph}
          </p>
          <AnimatedArrowButton className="mx-auto">
            {props.cta.label}
          </AnimatedArrowButton>
        </div>

        {/* Integration Diagram */}
        <div
          ref={containerRef}
          className="container relative flex w-full items-center justify-center overflow-hidden"
        >
          <div className="flex size-full h-[400px] max-w-xl flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center gap-6">
              {props.connections.nodes.slice(0, 5).map((node, index) =>
                typeof node === "string" ? (
                  <div key={index} className="relative size-14 z-50 rounded-full p-3 ring-2 ring-border ring-offset-4 ring-offset-background" ref={nodeRefs[index]}>
                    <Image
                      fill
                      className="rounded-full object-cover"
                      src={node}
                      alt=""
                    />
                  </div>
                ) : (
                  <Circle ref={nodeRefs[index]} key={index}>
                    {node}
                  </Circle>
                ),
              )}
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={baseRef} className="size-16">
                {props.connections.base}
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-6">
              {props.connections.nodes.slice(5).map((node, index) =>
                typeof node === "string" ? (
                  <Image
                    key={index}
                    className="rounded-full"
                    src={node}
                    alt=""
                    width={56}
                    height={56}
                  />
                ) : (
                  <Circle ref={nodeRefs[index + 5]} key={index}>
                    {node}
                  </Circle>
                ),
              )}
            </div>
          </div>

          {/* AnimatedBeams */}
          {props.connections.nodes.map((node, index) => (
            <AnimatedBeam
              key={index}
              containerRef={containerRef}
              fromRef={nodeRefs[index]}
              toRef={baseRef}
              duration={3}
            />
          ))}
        </div>
      </section>
    </DottedBackground>
  );
}

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border-2 bg-secondary p-3 ring-2 ring-border ring-offset-4 ring-offset-background",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";
