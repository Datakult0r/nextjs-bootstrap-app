"use client";

import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";

interface GetStartedSectionProps {
  title: string;
  heading: string;
  videosrc: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function GetStartedSection(props: GetStartedSectionProps) {
  return (
    <section className="relative h-[480px] w-full bg-muted lg:h-[640px]">
      <video
        src={props.videosrc}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/70">
        <div className="container flex h-full flex-col items-center justify-center gap-8">
          <TitleBlock
            {...props}
            size="lg"
            align="center"
            classNames={{
              container: "max-w-[740px] mx-auto text-center",
              heading: "text-white",
            }}
          />

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
    </section>
  );
}
