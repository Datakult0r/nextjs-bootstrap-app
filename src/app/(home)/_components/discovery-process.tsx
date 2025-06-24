"use client";

import React from "react";

import { Separator } from "@/components/ui/separator";
import { TitleBlock } from "@/components/common/title-block";
import { Timeline } from "@/components/ui/timeline";

interface DiscoveryProcessProps {
  title: string;
  heading: string;
  processes: {
    title: string;
    heading: string;
    paragraph: string;
    media: {
      src: string;
      alt: string;
    };
  }[];
}

export function DiscoveryProcess(props: DiscoveryProcessProps) {
  const timelineData = props.processes.map((process) => ({
    title: process.title,
    content: (
      <div className="space-y-8 overflow-hidden bg-background">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight lg:pr-8">
            {process.heading}
          </h2>
          <p className="text-muted-foreground">{process.paragraph}</p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <video
            src={process.media.src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    ),
  }));

  return (
    <section className="space-y-20 bg-background py-20 lg:px-6 border-b border-border">
      <div className="container space-y-10">
        <TitleBlock size="md" {...props} />
        <Separator className="bg-muted-foreground/10" />
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
